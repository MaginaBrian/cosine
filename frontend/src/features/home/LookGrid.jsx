import { Link } from "react-router-dom";

/** Kith-style four-up look strip under a campaign. */
export default function LookGrid({ looks, href = "/collections" }) {
  return (
    <div className="look-grid">
      {looks.map((look) => {
        const to = look.productId ? `/products/${look.productId}` : href;
        return (
          <article key={look.src} className="look-grid__cell">
            <Link to={to} className="look-grid__media">
              <img src={look.src} alt={look.alt || ""} loading="lazy" draggable="false" />
            </Link>
            <Link
              to={to}
              className="look-grid__bag"
              aria-label={look.alt ? `Shop ${look.alt}` : "Shop this look"}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.5 8.5h11l-.7 10.2a1.5 1.5 0 0 1-1.5 1.4H8.7a1.5 1.5 0 0 1-1.5-1.4L6.5 8.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
