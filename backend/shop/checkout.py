"""Checkout module: delivery details for the current bag."""

import re
import uuid

from flask import Blueprint, jsonify, request, session

from shop.catalog import money_exact

checkout_bp = Blueprint("checkout", __name__)

EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE = re.compile(r"^\d{6,15}$")

REQUIRED = {
    "name": "Enter your name.",
    "surname": "Enter your surname.",
    "region": "Choose a region.",
    "postCode": "Enter a post code.",
    "address": "Enter an address.",
    "house": "Enter a house number or name.",
    "town": "Enter a town.",
    "email": "Enter an email address.",
    "prefix": "Choose a prefix.",
    "telephone": "Enter a telephone number.",
}


def _clean(body):
    delivery = {}
    for key in (*REQUIRED, "company", "taxId"):
        delivery[key] = str(body.get(key, "")).strip()
    delivery["business"] = bool(body.get("business"))
    delivery["marketing"] = bool(body.get("marketing"))
    delivery["telephone"] = re.sub(r"\D", "", delivery["telephone"])
    return delivery


def _problems(delivery):
    problems = {}
    for key, message in REQUIRED.items():
        if not delivery.get(key):
            problems[key] = message
    if delivery.get("email") and not EMAIL.match(delivery["email"]):
        problems["email"] = "Enter a valid email address."
    if delivery.get("telephone") and not PHONE.match(delivery["telephone"]):
        problems["telephone"] = "Enter a telephone number, digits only."
    if delivery["business"] and not delivery["company"]:
        problems["company"] = "Enter the company name."
    return problems


def _order(delivery, lines):
    subtotal = sum(line["price"] * line["qty"] for line in lines)
    return {
        "id": uuid.uuid4().hex,
        "delivery": delivery,
        "count": sum(line["qty"] for line in lines),
        "subtotal": subtotal,
        "subtotalLabel": money_exact(subtotal),
        "lines": [
            {
                "id": line["id"],
                "title": line["title"],
                "color": line["color"],
                "size": line["size"],
                "qty": line["qty"],
                "priceExact": line["priceExact"],
            }
            for line in lines
        ],
    }


@checkout_bp.get("/checkout")
def get_checkout():
    draft = session.get("checkout")
    if not draft:
        return jsonify({"delivery": None})
    return jsonify(draft)


@checkout_bp.post("/checkout")
def save_checkout():
    lines = session.get("cart") or []
    if not lines:
        return jsonify({"error": "Your bag is empty."}), 400

    delivery = _clean(request.get_json(silent=True) or {})
    problems = _problems(delivery)
    if problems:
        return jsonify({"error": "Check the delivery details.", "fields": problems}), 400

    order = _order(delivery, lines)
    session["checkout"] = order
    session.modified = True
    return jsonify(order)
