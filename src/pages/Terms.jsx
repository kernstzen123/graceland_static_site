import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./Legal.css";

export default function Terms() {
  return (
    <main id="main" className="legal-page">
      <Nav variant="teal" />
      
      <div className="legal-header container">
        <span className="eyebrow">— THE RULES OF PLAY</span>
        <h1 className="headline legal-title">TERMS & CONDITIONS</h1>
      </div>

      <div className="legal-content container">
        <span className="legal-meta">Last Updated: September 9, 2026</span>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Graceland Venues, operated by Ace contractors & ENG cc trading as Graceland
          Venues, located at Lustigan Road, Southern Paarl, 7620. These terms and conditions govern
          your booking and use of our venue and facilities.
        </p>

        <h2>2. Provision of Goods and Services</h2>
        <p>
          The provision of goods and services by Graceland Venues is subject to availability. In cases of
          unavailability, Graceland Venues will refund the client in full within 30 days.
        </p>

        <h2>3. Cancellation and Refund Policy</h2>
        <p>Cancellation of orders by the client will attract the following administration fees:</p>
        <ul>
          <li><strong>10% administration fee</strong> of the cancelled order value for cancellation requests made over 14 days prior to the event start time and date.</li>
          <li><strong>15% administration fee</strong> of the cancelled order value for cancellation requests made between 24 hours and 14 days prior to the event start time and date.</li>
          <li><strong>20% administration fee</strong> of the cancelled order value for cancellation requests made within 24 hours prior to the event start time and date.</li>
        </ul>

        <h2>4. Payment Options and Verification</h2>
        <p>Bookings are processed securely through our platform. We accept online payments via PayFast and manual Electronic Funds Transfers (EFT).</p>
        <ul>
          <li><strong>PayFast:</strong> Payments made via PayFast are confirmed automatically.</li>
          <li><strong>Manual EFT:</strong> Payments made via manual EFT require the client to upload a valid proof of payment. The booking remains pending and is only confirmed once verified by our administrative team.</li>
        </ul>

        <h2>5. Ticketing and Venue Access</h2>
        <p>
          Upon successful payment and verification, clients will receive their booking confirmation and QR
          codes. These QR codes must be presented for scanning upon arrival at Graceland Venues.
        </p>

        <h2>6. Contact Information</h2>
        <p>For any inquiries, cancellations, or assistance, please contact us at:</p>
        <ul>
          <li><strong>Email:</strong> info@gracelandvenues.co.za</li>
          <li><strong>Phone:</strong> 072 264 4009</li>
          <li><strong>Address:</strong> Lustigan Road, Southern Paarl, 7620</li>
        </ul>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
