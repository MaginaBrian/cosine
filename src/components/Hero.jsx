import { heroImage } from "../data/images";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media">
        <img src={heroImage} alt="Cosine Made — editorial campaign image" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__grid">
        <h1 className="hero__headline">
          TIMELESS
          <br />
          BY DESIGN
        </h1>
      </div>
    </section>
  );
}