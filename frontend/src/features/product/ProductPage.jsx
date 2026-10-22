import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "@/features/catalog/api";
import { useCart } from "@/features/bag/cart";

const SIZE_CHART = [
  ["Size", "Chest", "Waist", "Hip"],
  ["XS", "86", "70", "90"],
  ["S", "90", "74", "94"],
  ["M", "96", "80", "100"],
  ["L", "102", "86", "106"],
  ["XL", "108", "92", "112"],
];

function Accordion({ title, open, onToggle, children }) {
  return (
    <div className={`pdp__fold ${open ? "is-open" : ""}`}>
      <button type="button" className="pdp__fold-toggle" aria-expanded={open} onClick={onToggle}>
        <span>{title}</span>
        <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="pdp__fold-panel">{children}</div>}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const { product, status } = useProduct(id);
  const { add } = useCart();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colorsOpen, setColorsOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [openFold, setOpenFold] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setColor(product.colors[0] || "");
    setSize("");
    setColorsOpen(false);
    setChartOpen(false);
    setOpenFold(null);
    setSizeError("");
    setAdded(false);
  }, [product]);

  useEffect(() => {
    if (!chartOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setChartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chartOpen]);

  const toggleFold = (name) => {
    setOpenFold((current) => (current === name ? null : name));
  };

  const chooseColor = (next) => {
    setColor(next);
    setColorsOpen(false);
  };

  const addToCart = async () => {
    if (!size) {
      setSizeError("Select a size.");
      return;
    }
    setSizeError("");
    setPending(true);
    try {
      await add({ productId: product.id, color, size, qty: 1 });
      setAdded(true);
    } catch (error) {
      setSizeError(error.message);
    } finally {
      setPending(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="pdp pdp--status">
        <p>Loading piece…</p>
      </div>
    );
  }

  if (status === "missing") {
    return (
      <div className="pdp pdp--status">
        <p>This piece is no longer in the collection.</p>
        <Link to="/collections">Back to collections</Link>
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div className="pdp pdp--status">
        <p>The shop API is not responding. Start it with npm run api, then refresh.</p>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${product.title} — Cosine Made`);

  return (
    <article className="pdp">
      <div className="pdp__gallery">
        {product.images.map((src, index) => (
          <img key={`${src}-${index}`} src={src} alt={index === 0 ? product.title : ""} />
        ))}
      </div>

      <div className="pdp__buy">
        <p className="pdp__collection">{product.collection}</p>
        <h1 className="pdp__title">{product.title}</h1>
        <p className="pdp__price">{product.priceExact}</p>

        <div className="pdp__options">
          <div>
            <label className="pdp__field">
              <span className="sr-only">Color</span>
              <select value={color} onChange={(event) => chooseColor(event.target.value)}>
                {product.colors.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            {product.colors.length > 1 && (
              <button type="button" className="pdp__option-link" onClick={() => setColorsOpen((open) => !open)}>
                More colors
              </button>
            )}
            {colorsOpen && (
              <ul className="pdp__color-list">
                {product.colors.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      className={name === color ? "is-active" : ""}
                      onClick={() => chooseColor(name)}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="pdp__field">
              <span className="sr-only">Size</span>
              <select
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                  setSizeError("");
                  setAdded(false);
                }}
              >
                <option value="">Select size</option>
                {product.sizes.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="pdp__option-link" onClick={() => setChartOpen(true)}>
              Size chart
            </button>
          </div>
        </div>

        {sizeError && <p className="pdp__error">{sizeError}</p>}

        <button type="button" className="pdp__cart" onClick={addToCart} disabled={pending}>
          {pending ? "Adding…" : added ? "Added to bag" : "Add to cart"}
        </button>
        {added && (
          <Link to="/bag" className="pdp__view-bag">
            View bag
          </Link>
        )}

        <p className="pdp__description">{product.description}</p>
        {product.finalSale && <p className="pdp__final">All sales of this item are final.</p>}

        <div className="pdp__folds">
          <Accordion title="Details" open={openFold === "details"} onToggle={() => toggleFold("details")}>
            <ul>
              {product.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Shipping policy" open={openFold === "shipping"} onToggle={() => toggleFold("shipping")}>
            <ul>
              {product.shipping.map((line) => (
                <li key={line.text}>
                  {line.href ? <Link to={line.href}>{line.text}</Link> : line.text}
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Share" open={openFold === "share"} onToggle={() => toggleFold("share")}>
            <div className="pdp__share">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              <a href={`mailto:?subject=${shareText}&body=${encodeURIComponent(shareUrl)}`}>Email</a>
            </div>
          </Accordion>
        </div>
      </div>

      {chartOpen && (
        <div className="pdp__scrim" onClick={() => setChartOpen(false)}>
          <div
            className="pdp__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-chart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pdp__dialog-head">
              <h2 id="size-chart-title">Size chart</h2>
              <button type="button" onClick={() => setChartOpen(false)}>
                Close
              </button>
            </div>
            <p>Measurements in centimetres. If you are between sizes, take the larger one.</p>
            <table>
              <thead>
                <tr>
                  {SIZE_CHART[0].map((cell) => (
                    <th key={cell}>{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.slice(1).map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </article>
  );
}
