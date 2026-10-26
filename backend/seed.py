"""Seed local accounts for testing. Run: backend/.venv/bin/python backend/seed.py"""

import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from shop.auth import USERS_FILE, _hash, _load, _save  # noqa: E402
from shop.inventory import reset_inventory  # noqa: E402

ACCOUNTS = [
    {
        "email": "studio@cosinemade.com",
        "name": "Studio Admin",
        "password": "StudioAdmin!",
        "role": "admin",
    },
    {
        "email": "amina@example.com",
        "name": "Amina Wanjiku",
        "password": "Customer1!",
        "role": "customer",
    },
]


def upsert(users, account):
    email = account["email"].lower()
    existing = next((user for user in users if user["email"] == email), None)
    now = datetime.now(timezone.utc).isoformat()
    if existing:
        existing["name"] = account["name"]
        existing["passwordHash"] = _hash(account["password"])
        existing["role"] = account["role"]
        existing["updatedAt"] = now
        return "updated"
    users.append(
        {
            "id": __import__("uuid").uuid4().hex,
            "email": email,
            "name": account["name"],
            "passwordHash": _hash(account["password"]),
            "role": account["role"],
            "createdAt": now,
        }
    )
    return "created"


def main():
    users = _load()
    results = []
    for account in ACCOUNTS:
        action = upsert(users, account)
        results.append((action, account))
    _save(users)
    stock = reset_inventory()
    piece_count = sum(
        qty
        for colors in stock.values()
        for sizes in colors.values()
        for qty in sizes.values()
    )

    print(f"Seeded {USERS_FILE}")
    print(f"Reset inventory ({piece_count} pieces on hand)")
    print()
    print(f"{'Role':<10} {'Email':<28} {'Password':<16} Status")
    print("-" * 68)
    for action, account in results:
        print(f"{account['role']:<10} {account['email']:<28} {account['password']:<16} {action}")
    print()
    print("Sign in at /account. Studio orders are at /admin after admin sign-in.")
    print("Moving an order to Stock checks colour/size against inventory and reserves pieces.")


if __name__ == "__main__":
    main()
