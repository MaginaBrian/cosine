import { Link } from "react-router-dom";
import Emblem from "./Emblem";

export default function Footer() {
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
              <a href="/">Instagram</a>
              <br />
              <a href="/">Pinterest</a>
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
            <span className="footer__label">Studio</span>
            <p>
              <Link to="/about">About</Link>
              <br />
              <Link to="/contact">Contact</Link>
            </p>
          </div>
        </div>

        <p className="footer__copy">© {new Date().getFullYear()} Cosine Made</p>
      </div>
    </footer>
  );
}