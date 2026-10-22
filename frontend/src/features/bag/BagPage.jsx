import { Link } from "react-router-dom";
import { useCart } from "./cart";

export default function BagPage() {
  const { cart, remove } = useCart();

  return (
    <div className="page-banner bag">
      <div className="page-banner__head">
        <span className="eyebrow">Bag</span>
        <h1>{cart.count === 0 ? "Your bag is empty." : "Your bag."}</h1>
      </div>

      {cart.count === 0 ? (
        <p className="product-grid__empty">
          <Link to="/collections">Browse the collection</Link>
        </p>
      ) : (
        <div className="bag__body">
          <ul className="bag__lines">
            {cart.lines.map((line) => (
              <li key={line.id} className="bag__line">
                <Link to={`/products/${line.productId}`} className="bag__thumb">
                  <img src={line.img} alt="" />
                </Link>
                <div>
                  <Link to={`/products/${line.productId}`} className="bag__title">
                    {line.title}
                  </Link>
                  <p>
                    {line.color} / {line.size}
                  </p>
                  <p>Qty {line.qty}</p>
                  <button type="button" onClick={() => remove(line.id)}>
                    Remove
                  </button>
                </div>
                <p className="bag__price">{line.priceExact}</p>
              </li>
            ))}
          </ul>
          <aside className="bag__summary">
            <p>
              <span>Subtotal</span>
              <strong>{cart.subtotalLabel}</strong>
            </p>
            <p className="bag__note">Shipping is calculated when you check out. All sales are final.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
