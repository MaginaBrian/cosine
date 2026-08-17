import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import { collectionsCatalog, MEN_TYPES } from "../data/images";

export default function MenPage() {
  const [params] = useSearchParams();
  const type = params.get("type");

  const products = collectionsCatalog.filter(
    (item) => item.category === "men" && (!type || item.type === type)
  );

  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Men</span>
        <h1>{type || "All men's pieces."}</h1>
      </div>

      <CategoryFilter types={MEN_TYPES} />

      <div className="product-grid-wrap">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
