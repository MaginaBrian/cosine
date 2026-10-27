import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <Link to={`/products/${item.id}`} className="collection-card">
      <div className="collection-card__frame">
        <img
          className="collection-card__img collection-card__img--front"
          src={item.img}
          alt={item.title}
          loading="lazy"
          draggable="false"
        />
        {item.imgBack && (
          <img
            className="collection-card__img collection-card__img--back"
            src={item.imgBack}
            alt=""
            aria-hidden="true"
            loading="lazy"
            draggable="false"
          />
        )}
        <span className="collection-card__shop">View</span>
      </div>
      <figcaption>
        <span className="collection-card__brand">COSINE MADE</span>
        <span className="collection-card__title">{item.title}</span>
        <span className="collection-card__price">{item.priceLabel || item.price}</span>
      </figcaption>
    </Link>
  );
}
