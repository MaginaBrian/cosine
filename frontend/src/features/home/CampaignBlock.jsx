import { Link } from "react-router-dom";
import LookGrid from "./LookGrid";

/** Full-bleed campaign band + four look tiles (Summer / Essentials). */
export default function CampaignBlock({ collection }) {
  return (
    <section id={collection.id} className="campaign">
      <div className="campaign__hero">
        <div className="campaign__media">
          <img src={collection.banner} alt="" />
          <div className="campaign__scrim" />
        </div>
        <div className="campaign__copy">
          <div className="campaign__text">
            {collection.kicker && <p className="campaign__kicker">{collection.kicker}</p>}
            <h2 className="campaign__title">{collection.title}</h2>
            {collection.copy && <p className="campaign__body">{collection.copy}</p>}
          </div>
          <div className="campaign__actions">
            <Link to={collection.href} className="hero__btn hero__btn--ghost">
              Discover
            </Link>
          </div>
        </div>
      </div>
      <LookGrid looks={collection.looks} href={collection.href} />
    </section>
  );
}
