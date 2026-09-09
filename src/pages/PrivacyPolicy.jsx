import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./Legal.css";

export default function PrivacyPolicy() {
  return (
    <main id="main" className="legal-page">
      <Nav variant="teal" />
      
      <div className="legal-header container">
        <span className="eyebrow">— THE BORING BUT IMPORTANT STUFF</span>
        <h1 className="headline legal-title">PRIVACY POLICY</h1>
      </div>

      <div className="legal-content container">
        <span className="legal-meta">Last Updated: September 9, 2026</span>

        <h2>1. Introduction and POPIA Compliance</h2>
        <p>
          Welcome to Graceland Venues, operated by Ace contractors & ENG cc trading as Graceland
          Venues, located at Lustigan Road, Southern Paarl, 7620. We respect your privacy and are
          committed to protecting your personal information in compliance with the Protection of Personal
          Information Act (POPIA) of South Africa. This Privacy Policy outlines how we collect, use, and
          safeguard your data when you use our booking and ticketing platform.
        </p>

        <h2>2. Information We Collect</h2>
        <p>When you use our website to make a booking or inquiry, we may collect the following personal information:</p>
        <ul>
          <li><strong>Identity Data:</strong> First name, last name.</li>
          <li><strong>Contact Data:</strong> Email address, telephone number.</li>
          <li><strong>Transaction Data:</strong> Booking details, voucher redemptions, and payment method details.</li>
          <li><strong>Financial Data:</strong> Proof of payment documentation for manual EFT uploads.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect primarily to process your bookings and provide our services. Specifically, we use your data to:</p>
        <ul>
          <li>Process your venue and seating reservations.</li>
          <li>Verify manual EFT payments through our admin portal.</li>
          <li>Send booking confirmations, QR-code tickets, and event updates.</li>
          <li>Manage voucher issuance and refunds.</li>
        </ul>

        <h2>4. Third-Party Service Providers</h2>
        <p>We utilize trusted third-party infrastructure to operate our platform securely. By using our services, you acknowledge that your data will be processed by the following providers:</p>
        <ul>
          <li><strong>Supabase:</strong> We use Supabase as our secure database provider to store user profiles, booking information, and venue data.</li>
          <li><strong>PayFast:</strong> Online payments are securely processed through PayFast. We do not store your direct credit card or banking login details on our servers.</li>
          <li><strong>Resend:</strong> We use Resend as our email provider to deliver essential communications such as tickets, receipts, and booking updates.</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          personal information from unauthorized access, disclosure, or destruction. Verification of
          manual EFTs is restricted to authorized administrative personnel only.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          In accordance with POPIA, you have the right to request access to the personal data we hold
          about you, request corrections to inaccurate data, or request the deletion of your data, subject
          to legal and operational retention requirements.
        </p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, our data practices, or to exercise your rights under POPIA, please contact us at:</p>
        <ul>
          <li><strong>Email:</strong> info@gracelandvenues.co.za</li>
          <li><strong>Phone:</strong> 072 264 4009</li>
          <li><strong>Address:</strong> Ace contractors & ENG cc trading as Graceland Venues, Lustigan Road, Southern Paarl, 7620</li>
        </ul>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
