import { NavLink } from "react-router-dom";
import { nav as navItems, contact } from "../data/content";
import BookNowButton from "./BookNowButton";
import "./MobileNavOverlay.css";

export default function MobileNavOverlay({ onClose }) {
  return (
    <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="mobile-overlay-top">
        <span className="mobile-overlay-logo">GRACELAND</span>
        <button className="mobile-overlay-close" aria-label="Close menu" onClick={onClose}>
          ✕
        </button>
      </div>
      <nav className="mobile-overlay-links" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            {item.label.toUpperCase()}
          </NavLink>
        ))}
      </nav>
      <div className="mobile-overlay-footer">
        <div className="mobile-overlay-contact">
          {contact.phone}
          <br />
          {contact.email}
        </div>
        <BookNowButton size="lg" />
      </div>
    </div>
  );
}
