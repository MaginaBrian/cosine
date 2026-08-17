import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import { kidsCatalog, KIDS_TYPES } from "../data/images";

export default function KidsPage() {
  const [params] = useSearchParams();
  const type = params.get("type");

  const products = kidsCatalog.filter((item) => !type || item.type === type);

  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Kids</span>
        <h1>{type || "All kids' pieces."}</h1>
      </div>

      <CategoryFilter types={KIDS_TYPES} />

      <div className="product-grid-wrap">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
