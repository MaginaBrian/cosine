export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="product-grid__empty">
        Nothing in this category yet — check back soon.
      </p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((item) => (
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
    </div>
  );
}
