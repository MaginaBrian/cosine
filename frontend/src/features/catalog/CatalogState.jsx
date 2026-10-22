import ProductGrid from "./ProductGrid";

export default function CatalogState({ status, products }) {
  if (status === "loading") {
    return <p className="product-grid__empty">Loading the collection…</p>;
  }
  if (status === "error") {
    return (
      <p className="product-grid__empty">
        The shop API is not responding. Start it with npm run api, then refresh.
      </p>
    );
  }
  return <ProductGrid products={products} />;
}
