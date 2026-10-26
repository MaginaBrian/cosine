import { Link } from "react-router-dom";
import { menPanelImage, womenPanelImage } from "@/content/images";

export default function GenderSplit() {
  return (
    <section className="collections">
      <div className="gender-split">
        <Link to="/men" className="gender-panel">
          <span className="gender-panel__frame">
            <img src={menPanelImage} alt="Shop the men's collection" draggable="false" />
            <span className="gender-panel__label">Men</span>
          </span>
          <span className="gender-panel__cta">Shop Men</span>
        </Link>

        <Link to="/women" className="gender-panel">
          <span className="gender-panel__frame">
            <img src={womenPanelImage} alt="Shop the women's collection" draggable="false" />
            <span className="gender-panel__label">Women</span>
          </span>
          <span className="gender-panel__cta">Shop Women</span>
        </Link>
      </div>
    </section>
  );
}
