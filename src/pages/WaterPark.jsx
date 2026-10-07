import Hero from "../components/Hero";
import LaneRope from "../components/LaneRope";
import AttractionRow from "../components/AttractionRow";
import RateTable from "../components/RateTable";
import HoursList from "../components/HoursList";
import RulesList from "../components/RulesList";
import BookNowButton from "../components/BookNowButton";
import DayPlanner from "../components/DayPlanner";
import ClosingPool from "../components/ClosingPool";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";
import {
  attractions,
  ratesWet,
  ratesDry,
  seatingOptions,
  dayVisitorHours,
  partyHours,
  closedNote,
  rules,
} from "../data/content";
import "./WaterPark.css";

export default function WaterPark() {
  const from = (rates) => rates.rows.find((r) => r.label === "Children 3–17").price;
  return (
    <main id="main">
      <Hero
        image="/assets/waterslide.jpg"
        imageAlt="The four waterslides at Graceland"
        eyebrow="The water park"
        title={
          <>
            Four slides,
            <br />
            three pools
          </>
        }
        sticker="Tuesday to Sunday"
      >
        <p className="hero-body">
          The waterslides, the rock, beach and bath pools, a toddler splash pad, and two dry play villages for when
          fingers go wrinkly.
        </p>
        <div className="hero-meta">
          <BookNowButton size="lg" />
          <div className="hero-meta-text">
            Kids from {from(ratesDry)} dry
            <br />
            <span>or {from(ratesWet)} with the water</span>
          </div>
        </div>
      </Hero>

      <section className="sec container" aria-labelledby="attractions-title">
        <div className="section-head">
          <span className="eyebrow">What's in there</span>
          <SplitText as="h2" className="headline section-title" id="attractions-title">
            The attractions
          </SplitText>
        </div>
        <div className="wp-attractions">
          {attractions.map((a) => (
            <AttractionRow key={a.number} {...a} />
          ))}
        </div>
      </section>

      <LaneRope top="var(--foam)" bottom="var(--deep)" />
      <section className="deep-band tiles--deep" aria-labelledby="rates-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--on-dark">What it costs</span>
            <SplitText as="h2" className="headline section-title" id="rates-title">
              Gate prices
            </SplitText>
          </div>
          <div className="ticket-grid">
            <RateTable {...ratesWet} headTone="teal" />
            <RateTable {...ratesDry} headTone="tan" />
            <RateTable {...seatingOptions} headTone="yellow" />
          </div>
          <div className="wp-planner">
            <div className="wp-planner-copy">
              <SplitText as="h3" className="headline headline--cream wp-planner-title">
                Add it up for your crew
              </SplitText>
              <p>Same prices as the tickets above, totalled for you.</p>
            </div>
            <DayPlanner />
          </div>
        </div>
      </section>
      <LaneRope top="var(--deep)" bottom="var(--foam)" />

      <section className="sec container two-col" aria-label="Opening times and rules">
        <div>
          <SplitText as="h2" className="headline card-title">
            Opening times
          </SplitText>
          <span className="subhead">Day visitors</span>
          <HoursList rows={dayVisitorHours} />
          <span className="subhead" id="parties">
            Party slots
          </span>
          <HoursList rows={partyHours} closedNote={closedNote} />
        </div>
        <div className="card card--lemon wp-rules-card">
          <SplitText as="h2" className="headline card-title">
            Pool rules
          </SplitText>
          <RulesList rules={rules} />
        </div>
      </section>

      <ClosingPool title="See you at the slides" />

      <Footer variant="simple" />
    </main>
  );
}
