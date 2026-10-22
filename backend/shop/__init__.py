"""Flask application factory. Catalog and bag are registered as blueprints."""

from flask import Flask

from shop.cart import cart_bp
from shop.catalog import catalog_bp


def create_app():
    app = Flask(__name__)
    app.secret_key = "cosine-made-dev"
    app.config.update(
        SESSION_COOKIE_SAMESITE="Lax",
        SESSION_COOKIE_HTTPONLY=True,
    )
    app.register_blueprint(catalog_bp, url_prefix="/api")
    app.register_blueprint(cart_bp, url_prefix="/api")
    return app
