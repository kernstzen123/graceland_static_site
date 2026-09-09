import Hero from "../components/Hero";
import WaveDivider from "../components/WaveDivider";
import RateTable from "../components/RateTable";
import HoursList from "../components/HoursList";
import RulesList from "../components/RulesList";
import BookNowButton from "../components/BookNowButton";
import Footer from "../components/Footer";
import {
  partyPackages,
  partyAddons,
  seatingOptions,
  partyIncludes,
  partyRules,
  partyHours,
  closedNote,
} from "../data/content";
import "./Parties.css";

export default function Parties() {
  return (
    <main id="main">
      <Hero
        image="/assets/park.jpg"
        imageAlt="Kids at Graceland Venues"
        imageFilter="saturate(1.2) sepia(0.1)"
        gradient="linear-gradient(180deg, rgba(233,96,31,0.7) 0%, rgba(233,96,31,0.2) 45%, rgba(42,18,6,0.60) 100%)"
        navVariant="pine"
        eyebrow="CELEBRATE WITH US"
        title={
          <>
            KIDDIES
            <br />
            PARTIES
          </>
        }
        waveAmplitude="mid"
      >
        <div className="hero-meta">
          <BookNowButton size="lg" />
          <div className="hero-meta-text">Ages 1–17 · From R200 per child</div>
        </div>
      </Hero>

      <div className="parties-intro container">
        <span className="eyebrow">— WHAT'S INCLUDED</span>
        <h2 className="headline parties-intro-title">THE PARTY EXPERIENCE</h2>
        <ul className="parties-includes-list">
          {partyIncludes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="parties-rates">
        <div className="parties-rates-heading">
          <span className="eyebrow eyebrow--on-dark">— WHAT IT COSTS</span>
          <h2 className="headline parties-rates-title">PACKAGES</h2>
        </div>
        <div className="parties-rates-grid">
          <RateTable {...partyPackages} headTone="teal" />
          <RateTable {...partyAddons} headTone="tan" />
          <RateTable {...seatingOptions} headTone="yellow" />
        </div>
      </div>

      <WaveDivider amplitude="mid" fill="#fbf3e2" bg="#123b3f" />

      <div className="parties-times-rules container">
        <div>
          <h2 className="headline parties-times-title">PARTY SLOTS</h2>
          <span className="parties-subhead">CHOOSE YOUR TIME</span>
          <HoursList rows={partyHours} closedNote={closedNote} />
          <p className="parties-note">
            Please only arrive 10 minutes before and leave 10 minutes after your slot.
            For parties longer than 2 hours, please book as a day visitor.
          </p>
        </div>
        <div className="parties-rules-card">
          <h2 className="headline parties-times-title">CATERING & RULES</h2>
          <RulesList rules={partyRules} />
        </div>
      </div>

      <WaveDivider amplitude="high" fill="#e9601f" bg="#fbf3e2" />
      <div className="parties-closing">
        <h2 className="headline parties-closing-title">
          BOOK YOUR
          <br />
          PARTY TODAY
        </h2>
        <div className="parties-closing-btn">
          <BookNowButton size="hero" />
        </div>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
