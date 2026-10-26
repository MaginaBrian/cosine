import { Link } from "react-router-dom";
import { lookbook } from "@/content/images";
import Slider from "./Slider";
import Reveal from "./Reveal";

export default function Lookbook() {
  return (
    <Reveal as="section" className="lookbook">
      <div className="section-head section-head--tight">
        <span className="eyebrow">Lookbook</span>
        <h2>Worn in, not worn out.</h2>
      </div>

      <Slider className="lookbook__slider">
        {lookbook.map((src, index) => (
          <figure className="lookbook-card" key={src}>
            <img src={src} alt={`Lookbook frame ${index + 1}`} draggable="false" />
          </figure>
        ))}
      </Slider>

      <div className="lookbook__foot">
        <Link to="/featured" className="lookbook__cta">
          Shop the edit →
        </Link>
      </div>
    </Reveal>
  );
}
