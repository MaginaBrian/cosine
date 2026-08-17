import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import { collectionsCatalog, WOMEN_TYPES } from "../data/images";

export default function WomenPage() {
  const [params] = useSearchParams();
  const type = params.get("type");

  const products = collectionsCatalog.filter(
    (item) => item.category === "women" && (!type || item.type === type)
  );

  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Women</span>
        <h1>{type || "All women's pieces."}</h1>
      </div>

      <CategoryFilter types={WOMEN_TYPES} />

      <div className="product-grid-wrap">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
