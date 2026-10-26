import { Link } from "react-router-dom";
import { useCart } from "./cart";
import { useAuth } from "@/features/account/auth";

export default function BagPage() {
  const { cart, remove } = useCart();
  const { isAuthenticated } = useAuth();
  const checkoutTo = isAuthenticated ? "/checkout" : "/account?next=%2Fcheckout";

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
            <p className="bag__note">
              {isAuthenticated
                ? "Complete every delivery field at checkout to place the order. All sales are final."
                : "You can keep shopping freely. Create an account or sign in before checkout."}
            </p>
            <Link to={checkoutTo} className="bag__checkout">
              {isAuthenticated ? "Checkout" : "Sign in to checkout"}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
