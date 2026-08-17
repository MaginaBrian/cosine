import ProductGrid from "../components/ProductGrid";
import { featuredCatalog } from "../data/images";

export default function FeaturedPage() {
  return (
    <div className="page-banner">
      <div className="page-banner__head">
        <span className="eyebrow">Featured</span>
        <h1>This season's edit.</h1>
      </div>

      <div className="product-grid-wrap">
        <ProductGrid products={featuredCatalog} />
      </div>
    </div>
  );
}
