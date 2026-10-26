"""Account auth: bcrypt passwords and JWT sessions."""

import json
import os
import re
import threading
import uuid
from datetime import datetime, timedelta, timezone
from functools import wraps
from pathlib import Path

import bcrypt
import jwt
from flask import Blueprint, g, jsonify, request

auth_bp = Blueprint("auth", __name__)

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
USERS_FILE = DATA_DIR / "users.json"
_LOCK = threading.Lock()
EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
SPECIAL = re.compile(r"[^A-Za-z0-9]")


def _password_problem(password, confirm=None):
    if len(password) < 8:
        return "Use at least 8 characters."
    if not SPECIAL.search(password):
        return "Include at least one special character."
    if confirm is not None and password != confirm:
        return "Passwords do not match."
    return None


def _secret():
    return os.environ.get("JWT_SECRET") or os.environ.get("SECRET_KEY") or "cosine-made-dev"


def _admin_email():
    return os.environ.get("ADMIN_EMAIL", "studio@cosinemade.com").strip().lower()


def _admin_password():
    # Empty env (common on Render when sync:false is unset) must not win over the default.
    return (os.environ.get("ADMIN_PASSWORD") or "").strip() or "StudioAdmin!"


def _load():
    if not USERS_FILE.exists():
        return []
    try:
        return json.loads(USERS_FILE.read_text())
    except (OSError, json.JSONDecodeError):
        return []


def _save(users):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    USERS_FILE.write_text(json.dumps(users, indent=2))


def _public(user):
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user.get("name", ""),
        "role": user.get("role", "customer"),
    }


def _hash(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def _check(password, hashed):
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


def _token(user):
    payload = {
        "sub": user["id"],
        "email": user["email"],
        "role": user.get("role", "customer"),
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, _secret(), algorithm="HS256")


def ensure_admin_user():
    """Create or repair the studio admin account so /admin stays reachable."""
    with _LOCK:
        users = _load()
        email = _admin_email()
        password = _admin_password()
        existing = next((user for user in users if user["email"] == email), None)
        if existing:
            changed = False
            if existing.get("role") != "admin":
                existing["role"] = "admin"
                changed = True
            try:
                password_ok = _check(password, existing.get("passwordHash", ""))
            except (ValueError, TypeError):
                password_ok = False
            # Repair mismatched hashes (e.g. Render created the account with an empty password).
            if not password_ok:
                existing["passwordHash"] = _hash(password)
                changed = True
            if changed:
                _save(users)
            return
        users.append(
            {
                "id": uuid.uuid4().hex,
                "email": email,
                "name": "Studio Admin",
                "passwordHash": _hash(password),
                "role": "admin",
                "createdAt": datetime.now(timezone.utc).isoformat(),
            }
        )
        _save(users)


def current_user():
    header = request.headers.get("Authorization", "")
    if not header.startswith("Bearer "):
        return None
    token = header[7:].strip()
    if not token:
        return None
    try:
        payload = jwt.decode(token, _secret(), algorithms=["HS256"])
    except jwt.PyJWTError:
        return None
    with _LOCK:
        users = _load()
    user = next((item for item in users if item["id"] == payload.get("sub")), None)
    return user


def require_user(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        user = current_user()
        if user is None:
            return jsonify({"error": "Sign in to continue."}), 401
        g.user = user
        return view(*args, **kwargs)

    return wrapped


def require_admin(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        user = current_user()
        if user is None:
            return jsonify({"error": "Sign in to continue."}), 401
        if user.get("role") != "admin":
            return jsonify({"error": "Studio access only."}), 403
        g.user = user
        return view(*args, **kwargs)

    return wrapped


@auth_bp.post("/auth/register")
def register():
    body = request.get_json(silent=True) or {}
    email = str(body.get("email", "")).strip().lower()
    name = str(body.get("name", "")).strip()
    password = str(body.get("password", ""))
    confirm = body.get("confirmPassword")
    if confirm is None:
        confirm = body.get("confirm")
    confirm = "" if confirm is None else str(confirm)

    if not name:
        return jsonify({"error": "Enter your name.", "fields": {"name": "Enter your name."}}), 400
    if not EMAIL.match(email):
        return jsonify({"error": "Enter a valid email.", "fields": {"email": "Enter a valid email."}}), 400
    problem = _password_problem(password, confirm)
    if problem:
        field = "confirmPassword" if problem == "Passwords do not match." else "password"
        return jsonify({"error": problem, "fields": {field: problem}}), 400

    with _LOCK:
        users = _load()
        if any(user["email"] == email for user in users):
            return jsonify({"error": "An account with that email already exists."}), 409
        user = {
            "id": uuid.uuid4().hex,
            "email": email,
            "name": name,
            "passwordHash": _hash(password),
            "role": "customer",
            "createdAt": datetime.now(timezone.utc).isoformat(),
        }
        users.append(user)
        _save(users)

    return jsonify({"token": _token(user), "user": _public(user)})


@auth_bp.post("/auth/login")
def login():
    body = request.get_json(silent=True) or {}
    email = str(body.get("email", "")).strip().lower()
    password = str(body.get("password", ""))
    with _LOCK:
        users = _load()
    user = next((item for item in users if item["email"] == email), None)
    if user is None or not _check(password, user["passwordHash"]):
        return jsonify({"error": "Email or password is wrong."}), 401
    return jsonify({"token": _token(user), "user": _public(user)})


@auth_bp.get("/auth/me")
@require_user
def me():
    return jsonify({"user": _public(g.user)})
