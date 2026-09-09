import Nav from "../components/Nav";
import HoursList from "../components/HoursList";
import BookNowButton from "../components/BookNowButton";
import Footer from "../components/Footer";
import WaveDivider from "../components/WaveDivider";
import { contact, dayVisitorHours, partyHours, closedNote, mapCenter } from "../data/content";
import "./Visit.css";

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Lustigan Road, Paarl, Western Cape, South Africa"
)}`;

export default function Visit() {
  return (
    <main id="main" className="visit-page">
      <Nav variant="teal" />

      <div className="visit-title-block container">
        <span className="eyebrow">— LUSTIGAN ROAD, PAARL</span>
        <h1 className="headline visit-title">FIND US</h1>
      </div>

      <div className="visit-grid">
        <div className="visit-contact">
          <div className="visit-contact-title">CONTACT</div>
          <div className="visit-contact-list">
            <div>
              <div className="visit-contact-label">PHONE</div>
              <a className="visit-contact-value" href={contact.phoneHref} style={{ textDecoration: "none" }}>
                {contact.phone}
              </a>
            </div>
            <div>
              <div className="visit-contact-label">EMAIL</div>
              <a
                className="visit-contact-value visit-contact-value--text"
                href={`mailto:${contact.email}`}
                style={{ textDecoration: "none" }}
              >
                {contact.email}
              </a>
            </div>
            <div>
              <div className="visit-contact-label">ADDRESS</div>
              <div className="visit-contact-value--plain">
                {contact.address.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < contact.address.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="visit-contact-label">OFFICE HOURS</div>
              <div className="visit-contact-value--plain">{contact.officeHours}</div>
            </div>
          </div>
          <div className="visit-contact-cta">
            <BookNowButton variant="primary" size="md" />
          </div>
        </div>

        <div className="visit-getting">
          <div className="visit-getting-title">GETTING HERE</div>
          <p className="visit-getting-body">
            Off the R301 on the Paarl side, then follow Lustigan Road to the
            end. Twenty-five minutes from Stellenbosch, fifty from Cape Town.
            Free parking on the lawn.
          </p>
          <div className="visit-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4600.275477572866!2d18.99066137689281!3d-33.75079971295881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcda8775fbbdae3%3A0xa3e4491926785af2!2sGraceland%20Venues!5e1!3m2!1sen!2sza!4v1788913625140!5m2!1sen!2sza" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="Google Map to Graceland Venues"
            ></iframe>
          </div>
          <a className="text-link visit-directions-link" href={directionsHref} target="_blank" rel="noreferrer">
            Get directions →
          </a>
        </div>
      </div>

      <div className="visit-hours container">
        <div>
          <div className="visit-hours-title">DAY VISITOR HOURS</div>
          <div style={{ marginTop: "20px" }}>
            <HoursList rows={dayVisitorHours} />
          </div>
        </div>
        <div>
          <div className="visit-hours-title">PARTY SLOTS</div>
          <div style={{ marginTop: "20px" }}>
            <HoursList rows={partyHours} closedNote={closedNote} />
          </div>
        </div>
      </div>

      <WaveDivider amplitude="high" fill="#e9601f" bg="#fbf3e2" />
      <div className="visit-closing">
        <h2 className="headline visit-closing-title">SEE YOU SATURDAY</h2>
        <div className="visit-closing-btn">
          <BookNowButton size="hero" />
        </div>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
