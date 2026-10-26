import { Link } from "react-router-dom";
import { heroImage, homeCollections } from "@/content/images";
import LookGrid from "./LookGrid";

const axis = homeCollections.find((c) => c.id === "axis");

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero__media">
          <img src={heroImage} alt="Cosine Made — AXIS campaign" />
          <div className="hero__scrim" />
        </div>

        <div className="hero__grid">
          <div className="hero__text">
            <p className="hero__kicker">{axis.kicker}</p>
            <h1 className="hero__headline">{axis.title}</h1>
          </div>
          <div className="hero__actions">
            <Link to={axis.href} className="hero__btn hero__btn--ghost">
              Discover
            </Link>
          </div>
        </div>
      </section>

      <LookGrid looks={axis.looks} href={axis.href} />
    </>
  );
}
