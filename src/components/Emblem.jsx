import emblemImg from "../assets/cosine-emblem.png";

export default function Emblem({ size = 120, spin = true, className = "" }) {
  return (
    <img
      src={emblemImg}
      alt="Cosine Made"
      width={size}
      height={size}
      draggable="false"
      className={`emblem ${spin ? "emblem--spin" : ""} ${className}`}
    />
  );
}
