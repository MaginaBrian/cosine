import { Link } from "react-router-dom";
import Emblem from "@/layout/Emblem";
import { useAuth } from "@/features/account/auth";

export default function Footer() {
  const { status, isAdmin } = useAuth();
  const showStudio = status === "ready" && isAdmin;

  return (
    <footer className="footer">
      <div className="footer__top">
        <h2>
          Let's make
          <br />
          something timeless.
        </h2>
        <a className="footer__mail" href="mailto:studio@cosinemade.com">
          studio@cosinemade.com ↗
        </a>
      </div>

      <div className="footer__bottom">
        <Emblem size={72} spin={false} />

        <div className="footer__cols">
          <div>
            <span className="footer__label">Studio</span>
            <p>Nairobi, Kenya</p>
          </div>
          <div>
            <span className="footer__label">Follow</span>
            <p>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <br />
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                Pinterest
              </a>
            </p>
          </div>
          <div>
            <span className="footer__label">Shop</span>
            <p>
              <Link to="/men">Men</Link>
              <br />
              <Link to="/women">Women</Link>
            </p>
          </div>
          <div>
            <span className="footer__label">We are Cosine</span>
            <p>
              <Link to="/purpose">Purpose</Link>
              <br />
              <Link to="/product">Product</Link>
              <br />
              <Link to="/people">People</Link>
              <br />
              <Link to="/insiders">Insiders</Link>
              {showStudio && (
                <>
                  <br />
                  <Link to="/admin">Orders</Link>
                </>
              )}
            </p>
          </div>
        </div>

        <p className="footer__copy">© {new Date().getFullYear()} Cosine Made</p>
      </div>

      <nav className="footer__legal" aria-label="Site">
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/privacy">Privacy and cookies</Link>
        <Link to="/account">Account</Link>
        <a href="mailto:studio@cosinemade.com">Client services</a>
      </nav>
    </footer>
  );
}
