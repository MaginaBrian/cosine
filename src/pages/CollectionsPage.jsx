import { useRef, useState } from "react";
import Slider from "../components/Slider";
import { collectionsCatalog } from "../data/images";

const TABS = [
  { label: "All", filter: "all" },
  { label: "Men", filter: "men" },
  { label: "Women", filter: "women" },
];

export default function CollectionsPage() {
  const sliderRef = useRef(null);
  const [active, setActive] = useState("all");

  const selectFilter = (filter) => {
    setActive(filter);
    if (filter === "all") {
      sliderRef.current?.scrollToIndex(0);
      return;
    }
    const index = collectionsCatalog.findIndex((item) => item.category === filter);
    if (index >= 0) sliderRef.current?.scrollToIndex(index);
  };

  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Collections</span>
        <h1>The full collection.</h1>
      </div>

      <section className="collections">
        <div className="collections__tabs">
          {TABS.map((t) => (
            <button
              key={t.filter}
              className={active === t.filter ? "is-active" : ""}
              onClick={() => selectFilter(t.filter)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Slider ref={sliderRef} className="collections__slider">
          {collectionsCatalog.map((item) => (
            <figure className="collection-card" key={item.id}>
              <div className="collection-card__frame">
                <img src={item.img} alt={item.title} draggable="false" />
              </div>
              <figcaption>
                <span className="collection-card__brand">Cosine Made</span>
                <span className="collection-card__title">{item.title}</span>
                <span className="collection-card__price">{item.price}</span>
              </figcaption>
            </figure>
          ))}
        </Slider>
      </section>
    </div>
  );
}
