"""Flask application factory. Catalog, bag, and checkout are blueprints."""

import os
from pathlib import Path

from flask import Flask, abort, request, send_from_directory

from shop.auth import auth_bp, ensure_admin_user
from shop.cart import cart_bp
from shop.catalog import catalog_bp
from shop.checkout import checkout_bp
from shop.orders import orders_bp

DIST = Path(__file__).resolve().parents[2] / "frontend" / "dist"


def create_app():
    app = Flask(__name__)
    on_render = os.environ.get("RENDER") == "true"
    frontend_origin = os.environ.get("FRONTEND_ORIGIN", "").rstrip("/")
    app.secret_key = os.environ.get("SECRET_KEY", "cosine-made-dev")
    # The static site is a different origin on Render, so the bag cookie must
    # be sent cross-site. Local dev stays same-origin through the Vite proxy.
    app.config.update(
        SESSION_COOKIE_SAMESITE="None" if frontend_origin else "Lax",
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SECURE=bool(frontend_origin) or on_render,
    )
    ensure_admin_user()
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(catalog_bp, url_prefix="/api")
    app.register_blueprint(cart_bp, url_prefix="/api")
    app.register_blueprint(checkout_bp, url_prefix="/api")
    app.register_blueprint(orders_bp, url_prefix="/api")
    _allow_frontend(app, frontend_origin)

    @app.get("/api/health")
    def health():
        return {"ok": True}

    if DIST.is_dir():
        _register_frontend(app, DIST)
    return app


def _allow_frontend(app, origin):
    if not origin:
        return

    def _headers(response):
        if request.headers.get("Origin") == origin:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Vary"] = "Origin"
        return response

    @app.before_request
    def preflight():
        if request.method != "OPTIONS" or request.headers.get("Origin") != origin:
            return None
        response = app.make_default_options_response()
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS"
        return _headers(response)

    @app.after_request
    def cors(response):
        return _headers(response)


def _register_frontend(app, dist):
    """Serve the built site from the same origin as the API so the bag cookie works."""

    @app.get("/", defaults={"path": ""})
    @app.get("/<path:path>")
    def frontend(path):
        if path == "api" or path.startswith("api/"):
            abort(404)
        asset = dist / path
        if path and asset.is_file():
            return send_from_directory(dist, path)
        return send_from_directory(dist, "index.html")
