const LINE = [
  "Made by hand",
  "Never restocked",
  "Nairobi studio",
  "Quiet luxury",
  "Collection One",
  "Built to endure",
];

export default function Marquee() {
  const loop = [...LINE, ...LINE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((text, index) => (
          <span key={`${text}-${index}`} className="marquee__item">
            {text}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
