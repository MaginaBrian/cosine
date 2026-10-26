import { Link } from "react-router-dom";
import { studioPillars } from "@/content/images";
import Reveal from "./Reveal";

export default function Pillars() {
  return (
    <Reveal as="section" className="pillars">
      <div className="pillars__grid">
        {studioPillars.map((pillar) => (
          <Link key={pillar.id} to={pillar.href} className="pillars__cell">
            <img src={pillar.src} alt="" loading="lazy" draggable="false" />
            <span className="pillars__label">{pillar.label}</span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
