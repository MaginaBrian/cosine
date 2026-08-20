import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { collectionsCatalog, originImage } from "../data/images";

const TABS = [
  { label: "All", filter: "all" },
  { label: "Men", filter: "men" },
  { label: "Women", filter: "women" },
];

const WRITE_UP =
  "For Collection One, Cosine Made returns to the essentials — fabric that moves with you, cuts that flatter without trying, and a palette built to outlast any single season. Every piece here is designed with intention, not simply produced for a season: a study in comfort, ease and effortless style, translated into a wardrobe for both men and women. Quality is communicated through the experience as much as the garments themselves.";

export default function CollectionsPage() {
  const [active, setActive] = useState("all");

  const products =
    active === "all"
      ? collectionsCatalog
      : collectionsCatalog.filter((item) => item.category === active);

  return (
    <div className="page-banner">
      <div className="collection-intro">
        <div className="collection-intro__copy">
          <span className="eyebrow">Collections</span>
          <h1>Collection One</h1>
          <p>{WRITE_UP}</p>
          <a href="#catalogue" className="collection-intro__shop">
            Shop
          </a>
        </div>
        <div className="collection-intro__image">
          <img src={originImage} alt="Cosine Made — Collection One campaign image" />
        </div>
      </div>

      <section className="collections" id="catalogue">
        <div className="collections__tabs">
          {TABS.map((t) => (
            <button
              key={t.filter}
              className={active === t.filter ? "is-active" : ""}
              onClick={() => setActive(t.filter)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="product-grid-wrap">
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
}