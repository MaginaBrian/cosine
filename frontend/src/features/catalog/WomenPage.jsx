import { useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import CatalogState from "./CatalogState";
import { WOMEN_TYPES } from "@/content/images";
import { useCatalog } from "./api";

export default function WomenPage() {
  const [params] = useSearchParams();
  const type = params.get("type");
  const { products, status } = useCatalog();

  const visible = products.filter(
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
        <CatalogState status={status} products={visible} />
      </div>
    </div>
  );
}
