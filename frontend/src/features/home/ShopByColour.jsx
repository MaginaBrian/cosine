import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colourStories, productMatchesColour } from "@/content/images";
import { useCatalog } from "@/features/catalog/api";
import Reveal from "./Reveal";

export default function ShopByColour() {
  const [activeSlug, setActiveSlug] = useState(null);
  const { products } = useCatalog();
  const navigate = useNavigate();
  const active = colourStories.find((story) => story.slug === activeSlug) || null;

  const matched = useMemo(() => {
    if (!active) return [];
    return (products || []).filter((product) => productMatchesColour(product, active)).slice(0, 6);
  }, [active, products]);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActiveSlug(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    document.body.classList.toggle("colour-open", Boolean(active));
    return () => document.body.classList.remove("colour-open");
  }, [active]);

  const openColourShop = (story) => {
    if (!story) return;
    setActiveSlug(story.slug);
    navigate(`/colour/${story.slug}`);
  };

  return (
    <Reveal as="section" className="shop-colour">
      <div className="shop-colour__head">
        <h2>/ Shop By Colour</h2>
        <button
          type="button"
          className={`shop-colour__arrow${active ? " is-ready" : ""}`}
          aria-label={
            active ? `Shop all ${active.name} pieces` : "Choose a colour, then open its full shop"
          }
          title={active ? `Shop all ${active.name}` : "Select a colour first"}
          onClick={() => {
            if (active) openColourShop(active);
            else {
              // Nudge: open the first tone if nothing is selected yet.
              openColourShop(colourStories[0]);
            }
          }}
        >
          →
        </button>
      </div>

      <div className="shop-colour__rail">
        {colourStories.map((story) => (
          <button
            key={story.slug}
            type="button"
            className={`shop-colour__tile${activeSlug === story.slug ? " is-active" : ""}`}
            onClick={() => setActiveSlug(activeSlug === story.slug ? null : story.slug)}
            onDoubleClick={() => openColourShop(story)}
          >
            <span
              className="shop-colour__swatch"
              style={{ "--tone": story.tone }}
              aria-hidden="true"
            />
            <span className="shop-colour__name">{story.name}</span>
          </button>
        ))}
      </div>

      {active && (
        <div className="colour-reveal" role="dialog" aria-label={`${active.name} looks`}>
          <div className="colour-reveal__bar">
            <p className="colour-reveal__title">/ {active.name}</p>
            <button
              type="button"
              className="colour-reveal__close"
              aria-label="Close colour look"
              onClick={() => setActiveSlug(null)}
            >
              ×
            </button>
          </div>

          <div className="colour-reveal__looks">
            {active.looks.map((src, index) => (
              <figure key={src} className="colour-reveal__look">
                <img src={src} alt={`${active.name} look ${index + 1}`} />
              </figure>
            ))}
          </div>

          {matched.length > 0 && (
            <div className="colour-reveal__products">
              {matched.map((item) => (
                <Link key={item.id} to={`/products/${item.id}`} className="colour-reveal__product">
                  <img src={item.img} alt={item.title} />
                  <span className="colour-reveal__product-meta">
                    <span>{item.title}</span>
                    <span>{item.priceLabel || item.price}</span>
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="colour-reveal__foot">
            <button type="button" className="colour-reveal__cta" onClick={() => openColourShop(active)}>
              Shop all {active.name} →
            </button>
          </div>
        </div>
      )}
    </Reveal>
  );
}
