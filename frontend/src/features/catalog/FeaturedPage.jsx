import { useCatalog } from "./api";
import CatalogState from "./CatalogState";

export default function FeaturedPage() {
  const { products, status } = useCatalog();
  const visible = products
    .filter((item) => item.featured)
    .sort((a, b) => a.featuredRank - b.featuredRank);

  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Featured</span>
        <h1>This season's edit.</h1>
      </div>

      <div className="product-grid-wrap">
        <CatalogState status={status} products={visible} />
      </div>
    </div>
  );
}
