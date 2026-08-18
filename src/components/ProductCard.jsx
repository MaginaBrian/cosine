export default function ProductCard({ item }) {
  return (
    <figure className="collection-card">
      <div className="collection-card__frame">
        <img
          className="collection-card__img collection-card__img--front"
          src={item.img}
          alt={item.title}
          draggable="false"
        />
        {item.imgBack && (
          <img
            className="collection-card__img collection-card__img--back"
            src={item.imgBack}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        )}
      </div>
      <figcaption>
        <span className="collection-card__brand">Cosine Made</span>
        <span className="collection-card__title">{item.title}</span>
        <span className="collection-card__price">{item.price}</span>
      </figcaption>
    </figure>
  );
}