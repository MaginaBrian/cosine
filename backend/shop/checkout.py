"""Checkout module: delivery details for the current bag."""

import re

from flask import Blueprint, jsonify, request, session

from shop.orders import place_order

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
    delivery["privacy"] = bool(body.get("privacy"))
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
    if not delivery.get("privacy"):
        problems["privacy"] = "Confirm you have read the Privacy and Cookies Policy."
    return problems


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

    order = place_order(delivery, lines)
    session["checkout"] = {
        "id": order["id"],
        "number": order["number"],
        "stage": order["stage"],
        "delivery": order["delivery"],
        "count": order["count"],
        "subtotal": order["subtotal"],
        "subtotalLabel": order["subtotalLabel"],
        "lines": order["lines"],
    }
    session["cart"] = []
    session.modified = True
    return jsonify(session["checkout"])
