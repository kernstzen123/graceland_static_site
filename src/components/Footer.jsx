import { Link } from "react-router-dom";
import { contact } from "../data/content";
import "./Footer.css";

/** variant "full" (Home — brand blurb + contact + site links) or
 *  "simple" (every other page — brand, contact, address). */
export default function Footer({ variant = "simple" }) {
  if (variant === "full") {
    return (
      <footer className="footer">
        <div>
          <div className="footer-brand">GRACELAND</div>
          <p className="footer-blurb">
            {contact.address.join(", ")}. Family-owned water park and venue
            since 2012.
          </p>
        </div>
        <div className="footer-col">
          <div className="footer-col-label">CONTACT</div>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          <a href={contact.phoneHref}>{contact.phone}</a>
          <br />
          Office {contact.officeHours}
        </div>
        <div className="footer-col">
          <div className="footer-col-label">VISIT</div>
          <Link to="/water-park">Water Park</Link>
          <br />
          <Link to="/parties">Parties</Link>
          <br />
          <Link to="/weddings">Weddings &amp; Functions</Link>
          <br />
          <Link to="/visit">Find Us</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-label">LEGAL</div>
          <Link to="/privacy">Privacy Policy</Link>
          <br />
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer footer--simple">
      <div className="footer-brand">GRACELAND</div>
      <div className="footer-col">
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <br />
        <a href={contact.phoneHref}>{contact.phone}</a>
      </div>
      <div className="footer-col">
        {contact.address.join(", ")}
        <br />
        Office {contact.officeHours}
      </div>
      <div className="footer-col">
        <Link to="/privacy">Privacy Policy</Link>
        <br />
        <Link to="/terms">Terms &amp; Conditions</Link>
      </div>
    </footer>
  );
}
