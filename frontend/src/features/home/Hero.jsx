import { Link } from "react-router-dom";
import { heroImage } from "@/content/images";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media">
        <img src={heroImage} alt="Cosine Made — editorial campaign image" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__grid">
        <p className="hero__kicker">Collection One · 2026</p>
        <h1 className="hero__headline">AXIS</h1>
        <p className="hero__subline">Made by hand. Never restocked.</p>
        <div className="hero__actions">
          <Link to="/collections" className="hero__btn">
            Shop
          </Link>
          <a href="#craft" className="hero__btn hero__btn--ghost">
            Discover
          </a>
        </div>
      </div>
    </section>
  );
}
