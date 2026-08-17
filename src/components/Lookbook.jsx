import Slider from "./Slider";
import { lookbook } from "../data/images";

export default function Lookbook() {
  return (
    <section id="lookbook" className="lookbook">
      <div className="section-head section-head--light section-head--tight">
        <span className="eyebrow">Lookbook</span>
      </div>

      <Slider className="lookbook__slider">
        {lookbook.map((src, i) => (
          <div className="lookbook-card" key={i}>
            <img src={src} alt={`Lookbook editorial ${i + 1}`} draggable="false" />
          </div>
        ))}
      </Slider>
    </section>
  );
}
