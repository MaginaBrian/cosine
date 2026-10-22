import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MEN_TYPES, WOMEN_TYPES } from "@/content/images";
import { useCart } from "@/features/bag/cart";
import Emblem from "@/layout/Emblem";

const LEFT = [
  { label: "Collections", to: "/collections" },
  { label: "Men", to: "/men", menu: MEN_TYPES, menuBase: "/men" },
  { label: "Women", to: "/women", menu: WOMEN_TYPES, menuBase: "/women" },
];

const RIGHT = [
  { label: "Search" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Bag", to: "/bag" },
];

const ALL_LINKS = [...LEFT, ...RIGHT.filter((item) => item.to)];

function NavItem({ item, openMenu, setOpenMenu, bagCount }) {
  if (!item.to) {
    // Decorative, non-routed item (e.g. Search).
    return <span className="nav__static">{item.label}</span>;
  }

  return (
    <div
      className="nav__item"
      onMouseEnter={() => item.menu && setOpenMenu(item.label)}
      onMouseLeave={() => item.menu && setOpenMenu(null)}
    >
      <NavLink to={item.to}>
        {item.label}
        {item.to === "/bag" && bagCount > 0 ? ` (${bagCount})` : ""}
      </NavLink>

      {item.menu && (
        <div className={`nav__dropdown ${openMenu === item.label ? "is-open" : ""}`}>
          {item.menu.map((type) => (
            <Link key={type} to={`${item.menuBase}?type=${encodeURIComponent(type)}`}>
              {type}
            </Link>
          ))}
          <Link to={item.menuBase} className="nav__dropdown-all">
            View all
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { cart } = useCart();

  return (
    <header className="nav">
      <div className="nav__row nav__row--primary">
        <nav className="nav__links nav__links--left">
          {LEFT.map((item) => (
            <NavItem key={item.to} item={item} openMenu={openMenu} setOpenMenu={setOpenMenu} bagCount={cart.count} />
          ))}
        </nav>

        <Link to="/" className="nav__wordmark">
          <Emblem size={30} spin={false} />
          <span>Cosine&nbsp;Made</span>
        </Link>

        <nav className="nav__links nav__links--right">
          {RIGHT.map((item) => (
            <NavItem key={item.to || item.label} item={item} openMenu={openMenu} setOpenMenu={setOpenMenu} bagCount={cart.count} />
          ))}
        </nav>

        <button
          className={`nav__burger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {ALL_LINKS.map((item) => (
          <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
            {item.label}
            {item.to === "/bag" && cart.count > 0 ? ` (${cart.count})` : ""}
          </Link>
        ))}
      </div>
    </header>
  );
}