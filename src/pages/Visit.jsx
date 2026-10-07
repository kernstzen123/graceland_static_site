import SplitText from "../components/SplitText";
import Nav from "../components/Nav";
import HoursList from "../components/HoursList";
import BookNowButton from "../components/BookNowButton";
import Footer from "../components/Footer";
import WaterEdge from "../components/WaterEdge";
import HoursPicker from "../components/HoursPicker";
import ClosingPool from "../components/ClosingPool";
import { contact, partyHours, closedNote } from "../data/content";
import "./Visit.css";

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Lustigan Road, Paarl, Western Cape, South Africa"
)}`;

export default function Visit() {
  return (
    <main id="main" className="visit-page">
      <Nav variant="teal" />

      <div className="page-title bg-pool">
        <div className="container">
          <span className="eyebrow">Lustigan Road, Paarl</span>
          <SplitText as="h1" className="headline page-title-text" split="hero">
            Find us
          </SplitText>
        </div>
      </div>
      <WaterEdge top="var(--pool)" bottom="var(--foam)" />

      <div className="visit-grid container">
        <div className="visit-contact card">
          <h2 className="card-title">Contact</h2>
          <div className="visit-contact-list">
            <div>
              <div className="visit-contact-label">Phone</div>
              <a className="visit-contact-value" href={contact.phoneHref}>
                {contact.phone}
              </a>
            </div>
            <div>
              <div className="visit-contact-label">Email</div>
              <a className="visit-contact-value visit-contact-value--text" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
            <div>
              <div className="visit-contact-label">Address</div>
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
              <div className="visit-contact-label">Office hours</div>
              <div className="visit-contact-value--plain">{contact.officeHours}</div>
            </div>
          </div>
          <div className="visit-contact-cta">
            <BookNowButton variant="primary" size="md" />
          </div>
        </div>

        <div className="visit-getting card card--lemon">
          <h2 className="card-title">Getting here</h2>
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
          <h2 className="card-title">Swim days</h2>
          <div className="visit-hours-body">
            <HoursPicker />
          </div>
        </div>
        <div>
          <h2 className="card-title">Party slots</h2>
          <div className="visit-hours-body">
            <HoursList rows={partyHours} closedNote={closedNote} />
          </div>
        </div>
      </div>

      <ClosingPool title="See you Saturday" />

      <Footer variant="simple" />
    </main>
  );
}
