"""Warehouse stock: match order lines to clothes on hand."""

import json
import threading
from pathlib import Path

from shop.catalog import PRODUCTS, find_product

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
INVENTORY_FILE = DATA_DIR / "inventory.json"
_LOCK = threading.Lock()
DEFAULT_QTY = 8


def _blank():
    """Starting stock for every product / color / size in the catalog."""
    stock = {}
    for product in PRODUCTS:
        product_stock = {}
        for color in product["colors"]:
            product_stock[color] = {size: DEFAULT_QTY for size in product["sizes"]}
        stock[product["id"]] = product_stock
    return stock


def _load():
    if not INVENTORY_FILE.exists():
        stock = _blank()
        _write(stock)
        return stock
    try:
        return json.loads(INVENTORY_FILE.read_text())
    except (OSError, json.JSONDecodeError):
        stock = _blank()
        _write(stock)
        return stock


def _write(stock):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    INVENTORY_FILE.write_text(json.dumps(stock, indent=2))


def available(stock, product_id, color, size):
    try:
        return int(stock.get(product_id, {}).get(color, {}).get(size, 0))
    except (TypeError, ValueError):
        return 0


def check_order_lines(lines, stock=None):
    """Compare each order line to clothes currently in stock."""
    stock = stock if stock is not None else _load()
    results = []
    ok = True
    for line in lines:
        product_id = line.get("productId")
        color = line.get("color")
        size = line.get("size")
        qty = int(line.get("qty") or 0)
        product = find_product(product_id) if product_id else None
        on_hand = available(stock, product_id, color, size)
        matched = bool(product) and color in product.get("colors", []) and size in product.get(
            "sizes", []
        )
        enough = matched and on_hand >= qty
        if not enough:
            ok = False
        results.append(
            {
                "lineId": line.get("id"),
                "productId": product_id,
                "title": line.get("title"),
                "color": color,
                "size": size,
                "qty": qty,
                "available": on_hand,
                "catalogMatch": matched,
                "inStock": enough,
                "status": "matched" if enough else ("unknown piece" if not matched else "short"),
            }
        )
    return {"ok": ok, "lines": results}


def reserve_for_order(lines):
    """
    Confirm every line matches stock, then take those pieces off the shelf.
    Returns (ok, stock_check).
    """
    with _LOCK:
        stock = _load()
        check = check_order_lines(lines, stock)
        if not check["ok"]:
            return False, check
        for line in lines:
            product_id = line["productId"]
            color = line["color"]
            size = line["size"]
            qty = int(line["qty"])
            stock[product_id][color][size] = available(stock, product_id, color, size) - qty
        _write(stock)
        check["reserved"] = True
        return True, check


def reset_inventory():
    with _LOCK:
        stock = _blank()
        _write(stock)
        return stock
