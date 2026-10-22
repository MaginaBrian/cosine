"""Bag module: session cart and /api/cart routes."""

import uuid

from flask import Blueprint, jsonify, request, session

from shop.catalog import find_product, money_exact

cart_bp = Blueprint("cart", __name__)


def _lines():
    return session.setdefault("cart", [])


def _payload(lines):
    count = sum(line["qty"] for line in lines)
    subtotal = sum(line["price"] * line["qty"] for line in lines)
    return {
        "lines": lines,
        "count": count,
        "subtotal": subtotal,
        "subtotalLabel": money_exact(subtotal),
    }


@cart_bp.get("/cart")
def get_cart():
    return jsonify(_payload(_lines()))


@cart_bp.post("/cart")
def add_to_cart():
    body = request.get_json(silent=True) or {}
    item = find_product(body.get("productId"))
    if item is None:
        return jsonify({"error": "Product not found."}), 404

    color = body.get("color")
    size = body.get("size")
    if color not in item["colors"]:
        return jsonify({"error": "Choose a color."}), 400
    if size not in item["sizes"]:
        return jsonify({"error": "Select a size."}), 400

    try:
        qty = int(body.get("qty", 1))
    except (TypeError, ValueError):
        qty = 0
    if qty < 1 or qty > 5:
        return jsonify({"error": "Quantity must be between 1 and 5."}), 400

    lines = _lines()
    existing = next(
        (
            line
            for line in lines
            if line["productId"] == item["id"] and line["color"] == color and line["size"] == size
        ),
        None,
    )
    if existing:
        existing["qty"] = min(existing["qty"] + qty, 5)
    else:
        lines.append(
            {
                "id": uuid.uuid4().hex,
                "productId": item["id"],
                "title": item["title"],
                "price": item["price"],
                "priceExact": money_exact(item["price"]),
                "color": color,
                "size": size,
                "qty": qty,
                "img": item["images"][0],
            }
        )

    session.modified = True
    return jsonify(_payload(lines))


@cart_bp.delete("/cart/<line_id>")
def remove_from_cart(line_id):
    lines = _lines()
    session["cart"] = [line for line in lines if line["id"] != line_id]
    session.modified = True
    return jsonify(_payload(session["cart"]))
