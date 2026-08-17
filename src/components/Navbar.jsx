import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MEN_TYPES, WOMEN_TYPES, KIDS_TYPES } from "../data/images";

const PRIMARY_LEFT = [
  { label: "Featured", to: "/featured" },
  { label: "Collections", to: "/collections" },
];

const PRIMARY_RIGHT = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Secondary row — sits left-aligned under Featured / Collections.
const SECONDARY = [
  { label: "Men", to: "/men", menu: MEN_TYPES, menuBase: "/men" },
  { label: "Women", to: "/women", menu: WOMEN_TYPES, menuBase: "/women" },
  { label: "Kids", to: "/kids", menu: KIDS_TYPES, menuBase: "/kids" },
];

const ALL_LINKS = [...PRIMARY_LEFT, ...SECONDARY, ...PRIMARY_RIGHT];

function NavDropdown({ item, openMenu, setOpenMenu }) {
  return (
    <div
      className="nav__item"
      onMouseEnter={() => item.menu && setOpenMenu(item.label)}
      onMouseLeave={() => item.menu && setOpenMenu(null)}
    >
      <NavLink to={item.to}>{item.label}</NavLink>

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__row nav__row--primary">
        <nav className="nav__links nav__links--left">
          {PRIMARY_LEFT.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="nav__wordmark">
          Cosine&nbsp;Made
        </Link>

        <nav className="nav__links nav__links--right">
          {PRIMARY_RIGHT.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
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

      <div className="nav__row nav__row--secondary">
        <nav className="nav__links nav__links--secondary">
          {SECONDARY.map((item) => (
            <NavDropdown key={item.to} item={item} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          ))}
        </nav>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {ALL_LINKS.map((item) => (
          <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
