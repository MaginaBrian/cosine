import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MEN_TYPES, WOMEN_TYPES } from "@/content/images";
import { useCart } from "@/features/bag/cart";
import { useAuth } from "@/features/account/auth";

const LEFT = [
  { label: "Collections", to: "/collections" },
  { label: "Men", to: "/men", menu: MEN_TYPES, menuBase: "/men" },
  { label: "Women", to: "/women", menu: WOMEN_TYPES, menuBase: "/women" },
];

const RIGHT = [
  { label: "Search" },
  { label: "Account", to: "/account" },
  { label: "Bag", to: "/bag" },
];

const CLOSE_DELAY_MS = 380;

function NavItem({ item, openMenu, onEnter, onLeave, bagCount }) {
  if (!item.to) {
    return <span className="nav__static">{item.label}</span>;
  }

  const active = item.menu && openMenu === item.label;

  return (
    <div
      className={`nav__item${active ? " is-active" : ""}`}
      onMouseEnter={() => item.menu && onEnter(item.label)}
      onMouseLeave={() => item.menu && onLeave()}
    >
      <NavLink to={item.to}>
        {item.label}
        {item.to === "/bag" && bagCount > 0 ? ` (${bagCount})` : ""}
      </NavLink>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();
  const { cart } = useCart();
  const { isAdmin } = useAuth();
  const onHome = pathname === "/";
  const menuOpen = Boolean(openMenu);
  const clear = onHome && !scrolled && !open && !menuOpen;

  const right = isAdmin
    ? [
        { label: "Search" },
        { label: "Account", to: "/account" },
        { label: "Studio", to: "/admin" },
        { label: "Bag", to: "/bag" },
      ]
    : RIGHT;

  const activeItem = LEFT.find((item) => item.label === openMenu);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenuNow = (label) => {
    cancelClose();
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    cancelClose();
  }, [pathname]);

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!onHome) {
      setScrolled(false);
      return undefined;
    }

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  return (
    <header
      className={[
        "nav",
        clear ? "nav--clear" : "nav--solid",
        menuOpen ? "nav--menu-open" : "",
        open ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseLeave={scheduleClose}
    >
      <div className="nav__row nav__row--primary">
        <nav className="nav__links nav__links--left">
          {LEFT.map((item) => (
            <NavItem
              key={item.to}
              item={item}
              openMenu={openMenu}
              onEnter={openMenuNow}
              onLeave={scheduleClose}
              bagCount={cart.count}
            />
          ))}
        </nav>

        <Link to="/" className="nav__wordmark">
          Cosine&nbsp;Made
        </Link>

        <nav className="nav__links nav__links--right">
          {right.map((item) => (
            <NavItem
              key={item.to || item.label}
              item={item}
              openMenu={openMenu}
              onEnter={openMenuNow}
              onLeave={scheduleClose}
              bagCount={cart.count}
            />
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

      {activeItem?.menu && (
        <div
          className="nav__panel"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="nav__panel-inner">
            {activeItem.menu.map((type) => (
              <Link
                key={type}
                to={`${activeItem.menuBase}?type=${encodeURIComponent(type)}`}
                onClick={() => setOpenMenu(null)}
              >
                {type}
              </Link>
            ))}
            <Link
              to={activeItem.menuBase}
              className="nav__panel-all"
              onClick={() => setOpenMenu(null)}
            >
              View all
            </Link>
          </div>
        </div>
      )}

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {[...LEFT, ...right.filter((item) => item.to)].map((item) => (
          <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
            {item.label}
            {item.to === "/bag" && cart.count > 0 ? ` (${cart.count})` : ""}
          </Link>
        ))}
      </div>
    </header>
  );
}
