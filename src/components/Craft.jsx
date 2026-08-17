import { craftImage } from "../data/images";

const PRINCIPLES = [
  {
    title: "Purpose before decoration",
    body: "Every element serves a purpose. Simplicity is achieved through intention, not omission.",
  },
  {
    title: "The product is the experience",
    body: "We stay quiet so the garment, material and craftsmanship can stay the focus.",
  },
  {
    title: "Built to endure",
    body: "We favour timeless design over temporary trends — relevant as the brand evolves.",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="craft">
      {/* Swap the <img> below for a <video autoPlay muted loop playsInline> once
          real footage is ready — the surrounding layout works with either. */}
      <div className="craft__media">
        <img src={craftImage} alt="Craftsmanship detail" />
      </div>

      <div className="craft__panel">
        <span className="eyebrow">Craft</span>
        <h2>Quality, considered at every stage.</h2>
        <ul className="craft__list">
          {PRINCIPLES.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
