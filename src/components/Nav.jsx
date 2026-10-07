import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { nav as navItems } from "../data/content";
import BookNowButton from "./BookNowButton";
import MobileNavOverlay from "./MobileNavOverlay";
import { lockScroll } from "../lib/motion";
import "./Nav.css";

/**
 * Floating pill header, the same on every page. It ducks out of the way
 * while you scroll down and pops back up the moment you scroll up.
 * `variant` only decides whether the page needs a spacer under it (pages
 * without a hero), so the fixed bar never covers the page title.
 */
export default function Nav({ variant = "transparent" }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y < 240 || y < last - 2) setHidden(false);
      else if (y > last + 2) setHidden(true);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const cls = ["nav", scrolled ? "nav--scrolled" : "", hidden && !open ? "nav--hidden" : ""].join(" ");

  return (
    <>
      <header className={cls}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Graceland Venues home">
            <span className="nav-logo-ring" aria-hidden="true" />
            Graceland
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-cta">
            <BookNowButton size="sm" />
          </div>
          <button
            className="nav-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {variant !== "transparent" && variant !== "pine" && <div className="nav-spacer" aria-hidden="true" />}
      {open && <MobileNavOverlay onClose={() => setOpen(false)} />}
    </>
  );
}
