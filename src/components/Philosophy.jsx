import { Link } from "react-router-dom";
import { philosophyImage } from "../data/images";

export default function Philosophy() {
  return (
    <section className="philosophy">
      <div className="philosophy__image">
        <img src={philosophyImage} alt="Cosine Made garment detail" />
      </div>

      <div className="philosophy__copy">
        <span className="eyebrow">About</span>
        <h2>
          Are we a fashion house?
          <br />
          Yes. And more than that.
        </h2>
        <p>
          We are not a trend cycle chasing next season before this one has
          been worn in. What we are is a small studio obsessed with getting
          the quiet things right — the drape, the seam, the way a garment
          sits after the tenth wash, not just the first fitting.
        </p>
        <Link to="/about" className="philosophy__link">
          Read our story →
        </Link>
      </div>
    </section>
  );
}
