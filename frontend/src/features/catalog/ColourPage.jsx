import { Link, useParams } from "react-router-dom";
import { findColourStory, productMatchesColour } from "@/content/images";
import { useCatalog } from "@/features/catalog/api";
import ProductCard from "./ProductCard";

export default function ColourPage() {
  const { slug } = useParams();
  const story = findColourStory(slug);
  const { products, status } = useCatalog();

  if (!story) {
    return (
      <section className="page-banner">
        <div className="page-banner__head">
          <h1>Colour not found</h1>
          <p>
            <Link to="/">Back home</Link>
          </p>
        </div>
      </section>
    );
  }

  const matched = (products || []).filter((product) => productMatchesColour(product, story));

  return (
    <section className="colour-page">
      <div className="colour-page__head">
        <p className="colour-page__kicker">Shop By Colour</p>
        <h1>/ {story.name}</h1>
        {status === "ready" && (
          <p className="colour-page__count">{matched.length} pieces</p>
        )}
      </div>

      <div className="colour-page__looks">
        {story.looks.map((src, index) => (
          <figure key={src}>
            <img src={src} alt={`${story.name} campaign ${index + 1}`} />
          </figure>
        ))}
      </div>

      <div className="colour-page__grid-wrap">
        {status === "loading" && <p className="colour-page__empty">Loading pieces…</p>}
        {status === "ready" && matched.length === 0 && (
          <p className="colour-page__empty">No pieces in this colour yet.</p>
        )}
        {matched.length > 0 && (
          <div className="collection-grid">
            {matched.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
