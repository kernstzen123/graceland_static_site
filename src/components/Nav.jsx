import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { nav as navItems } from "../data/content";
import BookNowButton from "./BookNowButton";
import MobileNavOverlay from "./MobileNavOverlay";
import "./Nav.css";

/**
 * Site header. `variant`:
 *  - "transparent" — overlays a hero image, goes solid pine once scrolled
 *    past it (Home, Weddings).
 *  - "pine"  — always solid pine (Water Park: hero photo is busy enough
 *    that the nav reads better solid from the start).
 *  - "teal"  — always solid teal, dark text (Visit: no hero).
 */
export default function Nav({ variant = "transparent" }) {
  const [scrolled, setScrolled] = useState(variant !== "transparent");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "transparent") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isTeal = variant === "teal";
  const isSolid = variant === "pine" || (variant === "transparent" && scrolled);

  const navClass = [
    "nav",
    isTeal ? "nav--teal" : isSolid ? "nav--solid" : "nav--transparent",
  ].join(" ");

  return (
    <>
      <header className={navClass}>
        <div className="nav-inner container">
          <Link to="/" className="nav-logo">
            GRACELAND
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
            <BookNowButton size="sm" />
          </nav>
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
      {open && <MobileNavOverlay onClose={() => setOpen(false)} />}
    </>
  );
}
