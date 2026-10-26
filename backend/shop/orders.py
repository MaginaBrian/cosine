"""Orders module: persist placed orders and track fulfilment stage."""

import json
import os
import threading
from datetime import datetime, timezone
from pathlib import Path

from flask import Blueprint, jsonify, request

from shop.catalog import money_exact

orders_bp = Blueprint("orders", __name__)

STAGES = ("Processing", "Production", "Stock", "Dispatch")
DATA_DIR = Path(__file__).resolve().parents[1] / "data"
ORDERS_FILE = DATA_DIR / "orders.json"
_LOCK = threading.Lock()


def _admin_key():
    return os.environ.get("ADMIN_KEY", "cosine-studio")


def _authorized():
    expected = _admin_key()
    provided = request.headers.get("X-Admin-Key") or request.args.get("key") or ""
    return provided == expected


def _now():
    return datetime.now(timezone.utc).isoformat()


def _load():
    if not ORDERS_FILE.exists():
        return []
    try:
        return json.loads(ORDERS_FILE.read_text())
    except (OSError, json.JSONDecodeError):
        return []


def _save(orders):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    ORDERS_FILE.write_text(json.dumps(orders, indent=2))


def _next_number(orders):
    highest = 0
    for order in orders:
        number = str(order.get("number", "")).replace("CM-", "")
        if number.isdigit():
            highest = max(highest, int(number))
    return f"CM-{highest + 1:04d}"


def place_order(delivery, lines):
    """Save a bag as an order in Processing. Called from checkout."""
    with _LOCK:
        orders = _load()
        order = {
            "id": f"ord_{len(orders) + 1:05d}_{int(datetime.now(timezone.utc).timestamp())}",
            "number": _next_number(orders),
            "createdAt": _now(),
            "stage": "Processing",
            "delivery": delivery,
            "count": sum(line["qty"] for line in lines),
            "subtotal": sum(line["price"] * line["qty"] for line in lines),
            "subtotalLabel": money_exact(sum(line["price"] * line["qty"] for line in lines)),
            "lines": [
                {
                    "id": line["id"],
                    "productId": line.get("productId"),
                    "title": line["title"],
                    "color": line["color"],
                    "size": line["size"],
                    "qty": line["qty"],
                    "price": line["price"],
                    "priceExact": line["priceExact"],
                    "img": line.get("img"),
                }
                for line in lines
            ],
        }
        orders.insert(0, order)
        _save(orders)
        return order


@orders_bp.post("/admin/login")
def admin_login():
    body = request.get_json(silent=True) or {}
    if body.get("key") != _admin_key():
        return jsonify({"error": "Wrong studio key."}), 401
    return jsonify({"ok": True})


@orders_bp.get("/orders")
def list_orders():
    if not _authorized():
        return jsonify({"error": "Studio key required."}), 401
    with _LOCK:
        orders = _load()
    return jsonify({"orders": orders, "stages": list(STAGES), "count": len(orders)})


@orders_bp.patch("/orders/<order_id>")
def update_order(order_id):
    if not _authorized():
        return jsonify({"error": "Studio key required."}), 401
    body = request.get_json(silent=True) or {}
    stage = body.get("stage")
    if stage not in STAGES:
        return jsonify({"error": "Choose Processing, Production, Stock, or Dispatch."}), 400

    with _LOCK:
        orders = _load()
        order = next((item for item in orders if item["id"] == order_id), None)
        if order is None:
            return jsonify({"error": "Order not found."}), 404
        order["stage"] = stage
        order["updatedAt"] = _now()
        _save(orders)
        return jsonify(order)


@orders_bp.delete("/orders/<order_id>")
def delete_order(order_id):
    if not _authorized():
        return jsonify({"error": "Studio key required."}), 401
    with _LOCK:
        orders = _load()
        kept = [item for item in orders if item["id"] != order_id]
        if len(kept) == len(orders):
            return jsonify({"error": "Order not found."}), 404
        _save(kept)
    return jsonify({"ok": True})
