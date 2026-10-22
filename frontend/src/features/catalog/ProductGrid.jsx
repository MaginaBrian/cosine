import ProductCard from "./ProductCard";

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
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  );
}