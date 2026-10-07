import Hero from "../components/Hero";
import LaneRope from "../components/LaneRope";
import RateTable from "../components/RateTable";
import HoursList from "../components/HoursList";
import RulesList from "../components/RulesList";
import BookNowButton from "../components/BookNowButton";
import ClosingPool from "../components/ClosingPool";
import SplitText from "../components/SplitText";
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
        imageAlt="Kids at a party at Graceland"
        eyebrow="Kids' parties · ages 1–17"
        title={
          <>
            Party
            <br />
            in the pool
          </>
        }
        sticker="From R200 a child"
      >
        <p className="hero-body">
          Two-hour party slots with the slides, the pools, the play villages and your own party hut. You bring the
          cake.
        </p>
        <div className="hero-meta">
          <BookNowButton size="lg" />
        </div>
      </Hero>

      <section className="sec container" aria-labelledby="includes-title">
        <div className="section-head">
          <span className="eyebrow">What's included</span>
          <SplitText as="h2" className="headline section-title" id="includes-title">
            Every party gets
          </SplitText>
        </div>
        <ul className="parties-includes-list">
          {partyIncludes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <LaneRope top="var(--foam)" bottom="var(--deep)" />
      <section className="deep-band tiles--deep" aria-labelledby="packages-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--on-dark">What it costs</span>
            <SplitText as="h2" className="headline section-title" id="packages-title">
              Packages
            </SplitText>
          </div>
          <div className="ticket-grid">
            <RateTable {...partyPackages} headTone="teal" />
            <RateTable {...partyAddons} headTone="tan" />
            <RateTable {...seatingOptions} headTone="yellow" />
          </div>
        </div>
      </section>
      <LaneRope top="var(--deep)" bottom="var(--foam)" />

      <section className="sec container two-col" aria-label="Party slots and rules">
        <div>
          <SplitText as="h2" className="headline card-title">
            Party slots
          </SplitText>
          <span className="subhead">Pick a two-hour slot</span>
          <HoursList rows={partyHours} closedNote={closedNote} />
          <p className="parties-note">
            Please arrive no more than 10 minutes before your slot and leave within 10 minutes after it. Parties
            longer than two hours book as day visitors.
          </p>
        </div>
        <div className="card card--lemon">
          <SplitText as="h2" className="headline card-title">
            Catering &amp; rules
          </SplitText>
          <RulesList rules={partyRules} />
        </div>
      </section>

      <ClosingPool title="Book the party" />

      <Footer variant="simple" />
    </main>
  );
}
