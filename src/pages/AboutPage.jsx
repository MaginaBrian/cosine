const LINES = [
  "Let's address the obvious question first.",
  "Are we just another fashion label? No. And yes.",
  "Do we chase every trend that scrolls past? No.",
  "Have we spent years obsessing over how a seam sits, how a hem falls? Yes.",
  "Are we a warehouse of overproduction and next season already? No.",
  "What we are is a small studio, cutting cloth with intention.",
  "Clothing that is considered, refined and intentionally simple.",
  "Where collections, craftsmanship and point of view come together.",
  "We are pattern cutters, tailors, thinkers and lifelong students of the craft.",
  "Most of all, what we're not is decoration for decoration's sake.",
  "We're fabric and thread, and a whole lot of care in the cutting room.",
  "Like the very people we dress.",
];

export default function AboutPage() {
  return (
    <section className="about-page">
      <h1>About</h1>
      <div className="about-page__body">
        {LINES.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </section>
  );
}
