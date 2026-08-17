export default function Marquee() {
  const phrase = "PURPOSE BEFORE DECORATION  —  BUILT TO ENDURE  —  ";
  return (
    <div className="marquee">
      <div className="marquee__track">
        <span>{phrase.repeat(4)}</span>
        <span aria-hidden="true">{phrase.repeat(4)}</span>
      </div>
    </div>
  );
}
