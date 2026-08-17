import { heroImage } from "../data/images";
import Emblem from "./Emblem";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media">
        <img src={heroImage} alt="Cosine Made — editorial campaign image" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__grid">
        <div className="hero__meta">
          <span>Cosine Made</span>
          <span>Currently in — Nairobi Studio</span>
          <span>Est. 2026</span>
          <span>Collections, Craft, Contact</span>
        </div>

        <h1 className="hero__headline">
          TIMELESS
          <br />
          BY DESIGN
        </h1>

        <div className="hero__foot">
          <div className="hero__arrow" aria-hidden="true">
            ↓
          </div>
          <p>
            Clothing rooted in comfort, ease and
            <br />
            effortless style.
          </p>
          <Emblem size={104} />
        </div>
      </div>
    </section>
  );
}
