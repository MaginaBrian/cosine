"""Catalog module: product data and /api/products routes."""

from flask import Blueprint, jsonify, request


def _photo(photo_id, w=1400):
    return f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w={w}&q=80"


SHIPPING = [
    {
        "text": "Standard processing time for orders is 3–5 business days to be processed and shipped.",
    },
    {
        "text": "Read our full shipping policy here.",
        "href": "/contact",
    },
]

PRODUCTS = [
    {
        "id": "m1",
        "category": "men",
        "type": "Outerwear",
        "collection": "Collection One",
        "title": "Structured Wool Blazer",
        "price": 24500,
        "featuredRank": 0,
        "colors": ["Charcoal", "Camel"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A structured wool blazer cut with a relaxed shoulder and a clean lapel. "
            "Medium-weight wool holds its shape through the day and still moves when you do. "
            "Wear it open over a tee, or buttoned when the evening asks for it."
        ),
        "details": [
            "Medium-weight wool blend with a soft hand",
            "Relaxed shoulder, structured lapel, fully lined",
            "Two interior pockets and a single-button close",
            "Dry clean",
        ],
        "images": [
            _photo("photo-1617137968427-85924c800a22"),
            _photo("photo-1507679799987-c73779587ccf"),
            _photo("photo-1520975954732-35dd22299614"),
            _photo("photo-1558171813-4c088753af8f"),
        ],
    },
    {
        "id": "m2",
        "category": "men",
        "type": "Bottoms",
        "collection": "Collection One",
        "title": "Wide Leg Trouser",
        "price": 14200,
        "featuredRank": 4,
        "colors": ["Stone", "Black"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A wide-leg trouser with a high rise and a straight, full leg. "
            "The cloth drapes rather than clings, so the silhouette stays easy from morning to late."
        ),
        "details": [
            "Fluid suiting cloth with a dry finish",
            "High rise, belt loops, side pockets",
            "Full length meant to break lightly at the shoe",
            "Machine wash cold or dry clean",
        ],
        "images": [
            _photo("photo-1594938298603-c8148c4dae35"),
            _photo("photo-1506629082955-511b1aa562c8"),
            _photo("photo-1473966968600-fa801b869a1a"),
            _photo("photo-1503341504253-dff4815485f1"),
        ],
    },
    {
        "id": "m3",
        "category": "men",
        "type": "Tops",
        "collection": "Collection One",
        "title": "Relaxed Overshirt",
        "price": 12800,
        "featuredRank": None,
        "colors": ["Ecru", "Ink"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "An overshirt cut a size easy, with a soft collar and a straight hem. "
            "It works as a light jacket in Nairobi weather and as a shirt when the layer comes off."
        ),
        "details": [
            "Washed cotton with a brushed face",
            "Button front, chest pocket, curved hem",
            "Relaxed through the body and sleeve",
            "Machine wash cold, hang dry",
        ],
        "images": [
            _photo("photo-1505022610480-028101dfd732"),
            _photo("photo-1489987707025-afc232f7ea0f"),
            _photo("photo-1521572163474-6864f9cf17ab"),
            _photo("photo-1523381210434-271e8be1f52b"),
        ],
    },
    {
        "id": "m4",
        "category": "men",
        "type": "Tops",
        "collection": "Collection One",
        "title": "Boxy Tee",
        "price": 6200,
        "featuredRank": None,
        "colors": ["Pearl", "Onyx"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A boxy tee in heavy cotton jersey. The shoulder is dropped, the neck is clean, "
            "and the length sits at the hip so it works tucked or left out."
        ),
        "details": [
            "Heavyweight cotton jersey",
            "Dropped shoulder, bound neckline",
            "Boxy body, straight hem",
            "Machine wash cold, tumble low",
        ],
        "images": [
            _photo("photo-1551232864-3f0890e580d9"),
            _photo("photo-1485968579580-b6d095142e6e"),
            _photo("photo-1521572163474-6864f9cf17ab"),
            _photo("photo-1576566588028-4147f3842f27"),
        ],
    },
    {
        "id": "m5",
        "category": "men",
        "type": "Bottoms",
        "collection": "Collection One",
        "title": "Belted Chino",
        "price": 13900,
        "featuredRank": None,
        "colors": ["Khaki", "Navy"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A belted chino with a tapered leg and a soft waist. "
            "The cloth is garment-dyed so the color sits in the fibre instead of on top of it."
        ),
        "details": [
            "Garment-dyed cotton twill",
            "Self-belt, slash pockets, coin pocket",
            "Tapered leg, unfinished hem you can crop",
            "Machine wash cold, hang dry",
        ],
        "images": [
            _photo("photo-1445205170230-053b83016050"),
            _photo("photo-1503341504253-dff4815485f1"),
            _photo("photo-1473966968600-fa801b869a1a"),
            _photo("photo-1542272604-787c3835535d"),
        ],
    },
    {
        "id": "m6",
        "category": "men",
        "type": "Tops",
        "collection": "Collection One",
        "title": "Merino Crewneck",
        "price": 11400,
        "featuredRank": 2,
        "colors": ["Oatmeal", "Navy"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A fine merino crewneck with a close neck and a straight body. "
            "It layers under the blazer and stands on its own when the day warms up."
        ),
        "details": [
            "Extra-fine merino wool",
            "Set-in sleeve, ribbed neck, cuff and hem",
            "Regular fit, hip length",
            "Hand wash cold or dry clean",
        ],
        "images": [
            _photo("photo-1516257984-b1b4d707412e"),
            _photo("photo-1467043237213-65f2da53396f"),
            _photo("photo-1434389677669-e08b4cac3105"),
            _photo("photo-1614975059251-992f11792b9f"),
        ],
    },
    {
        "id": "w1",
        "category": "women",
        "type": "Outerwear",
        "collection": "Collection One",
        "title": "Cropped Knit Cardigan",
        "price": 15600,
        "featuredRank": 3,
        "colors": ["Ivory", "Cocoa"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A cropped cardigan in a soft knit, with a deep V and a buttoned front. "
            "It ends at the waist so it sits cleanly over the slip dress or the wide trouser."
        ),
        "details": [
            "Cotton-wool knit with a dry hand",
            "Cropped length, horn buttons",
            "Slightly eased shoulder",
            "Hand wash cold, dry flat",
        ],
        "images": [
            _photo("photo-1434389677669-e08b4cac3105"),
            _photo("photo-1490481651871-ab68de25d43d"),
            _photo("photo-1483985988355-763728e1935b"),
            _photo("photo-1515886657613-9f3515b0c78f"),
        ],
    },
    {
        "id": "w2",
        "category": "women",
        "type": "Bottoms",
        "collection": "Collection One",
        "title": "Straight Leg Denim",
        "price": 13200,
        "featuredRank": None,
        "colors": ["Indigo", "Ecru"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "Straight-leg denim with a mid rise and a clean hem. "
            "The wash is quiet — no whiskering, no distressing — so the cut does the talking."
        ),
        "details": [
            "Rigid cotton denim that eases with wear",
            "Mid rise, five-pocket, button fly",
            "Straight leg, full length",
            "Wash inside out, hang dry",
        ],
        "images": [
            _photo("photo-1509631179647-0177331693ae"),
            _photo("photo-1544022613-e87ca75a784a"),
            _photo("photo-1541099649105-f69ad21f3246"),
            _photo("photo-1475178626620-a4d074967452"),
        ],
    },
    {
        "id": "w3",
        "category": "women",
        "type": "Tops",
        "collection": "Collection One",
        "title": "Silk Slip Dress",
        "price": 18400,
        "featuredRank": 1,
        "colors": ["Champagne", "Black"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A silk slip with thin straps and a bias cut that follows the body without holding it. "
            "The hem falls below the knee. Wear it alone, or under the cropped cardigan."
        ),
        "details": [
            "Silk satin with a soft lustre",
            "Bias cut, adjustable straps",
            "Midi length, side slit",
            "Dry clean",
        ],
        "images": [
            _photo("photo-1515886657613-9f3515b0c78f"),
            _photo("photo-1496747611176-843222e1e57c"),
            _photo("photo-1490481651871-ab68de25d43d"),
            _photo("photo-1469334031218-e382a71b716b"),
        ],
    },
    {
        "id": "w4",
        "category": "women",
        "type": "Outerwear",
        "collection": "Collection One",
        "title": "Tailored Vest",
        "price": 11700,
        "featuredRank": None,
        "colors": ["Black", "Sand"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A tailored vest with a deep V and a nipped waist. "
            "It sharpens a tee or sits over the slip when you want a layer without sleeves."
        ),
        "details": [
            "Wool-cotton suiting",
            "Five-button front, welt pockets",
            "Lined, shaped waist",
            "Dry clean",
        ],
        "images": [
            _photo("photo-1524504388940-b1c1722653e1"),
            _photo("photo-1552374196-c4e7ffc6e126"),
            _photo("photo-1509631179647-0177331693ae"),
            _photo("photo-1487222477894-8943e31ef7b2"),
        ],
    },
    {
        "id": "w5",
        "category": "women",
        "type": "Bottoms",
        "collection": "Collection One",
        "title": "Wide Trousers",
        "price": 14900,
        "featuredRank": 5,
        "colors": ["Ivory", "Black"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "Wide trousers with a pressed crease and a fluid leg. "
            "The rise is high, the cloth is light, and the hem is cut to skim the floor in a heel."
        ),
        "details": [
            "Fluid viscose-wool blend",
            "High rise, pressed crease, side pockets",
            "Full wide leg",
            "Dry clean",
        ],
        "images": [
            _photo("photo-1490481651871-ab68de25d43d"),
            _photo("photo-1483985988355-763728e1935b"),
            _photo("photo-1509631179647-0177331693ae"),
            _photo("photo-1515886657613-9f3515b0c78f"),
        ],
    },
    {
        "id": "w6",
        "category": "women",
        "type": "Outerwear",
        "collection": "Collection One",
        "title": "Relaxed Trench",
        "price": 19800,
        "featuredRank": None,
        "colors": ["Stone", "Black"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": (
            "A relaxed trench with a soft shoulder and a hidden closure. "
            "It is cut long enough to cover a dress, light enough to wear through the rains."
        ),
        "details": [
            "Cotton-gabardine with a water-resistant finish",
            "Raglan shoulder, hidden placket, storm flap",
            "Self-belt, side pockets",
            "Dry clean",
        ],
        "images": [
            _photo("photo-1487222477894-8943e31ef7b2"),
            _photo("photo-1469334031218-e382a71b716b"),
            _photo("photo-1490114538077-0a7f8cb49891"),
            _photo("photo-1524504388940-b1c1722653e1"),
        ],
    },
]


def money_exact(amount):
    return f"KSh{amount:,.2f}"


def _money_label(amount):
    return f"KSh {amount:,}"


def find_product(product_id):
    return next((item for item in PRODUCTS if item["id"] == product_id), None)


def card(product):
    images = product["images"]
    return {
        "id": product["id"],
        "category": product["category"],
        "type": product["type"],
        "collection": product["collection"],
        "title": product["title"],
        "price": product["price"],
        "priceLabel": _money_label(product["price"]),
        "priceExact": money_exact(product["price"]),
        "img": images[0],
        "imgBack": images[1] if len(images) > 1 else None,
        "featured": product["featuredRank"] is not None,
        "featuredRank": product["featuredRank"],
    }


def detail(product):
    return {
        **card(product),
        "colors": product["colors"],
        "sizes": product["sizes"],
        "description": product["description"],
        "details": product["details"],
        "shipping": SHIPPING,
        "finalSale": True,
        "images": product["images"],
    }


def list_products():
    return [card(product) for product in PRODUCTS]


catalog_bp = Blueprint("catalog", __name__)


@catalog_bp.get("/products")
def products():
    items = list_products()
    category = request.args.get("category")
    garment = request.args.get("type")
    if category:
        items = [item for item in items if item["category"] == category]
    if garment:
        items = [item for item in items if item["type"] == garment]
    if request.args.get("featured") == "1":
        items = [item for item in items if item["featured"]]
        items.sort(key=lambda item: item["featuredRank"])
    return jsonify(items)


@catalog_bp.get("/products/<product_id>")
def product(product_id):
    item = find_product(product_id)
    if item is None:
        return jsonify({"error": "Product not found."}), 404
    return jsonify(detail(item))
