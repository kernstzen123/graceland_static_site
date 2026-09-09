import Hero from "../components/Hero";
import WaveDivider from "../components/WaveDivider";
import AttractionRow from "../components/AttractionRow";
import RateTable from "../components/RateTable";
import HoursList from "../components/HoursList";
import RulesList from "../components/RulesList";
import BookNowButton from "../components/BookNowButton";
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
  return (
    <main id="main">
      <Hero
        image="/assets/waterslide.jpg"
        imageAlt="Waterslide at Graceland"
        imageFilter="saturate(0.9) sepia(0.1)"
        gradient="linear-gradient(180deg, rgba(18,59,63,0.74) 0%, rgba(18,59,63,0.10) 45%, rgba(42,18,6,0.60) 100%)"
        navVariant="pine"
        eyebrow="THE WATER PARK"
        title={
          <>
            FOUR SLIDES,
            <br />
            THREE POOLS
          </>
        }
        waveAmplitude="mid"
        vars={{
          "--hero-height": "720px",
          "--hero-height-mobile": "520px",
          "--hero-title-min": "42px",
          "--hero-title-max": "132px",
          "--hero-content-max": "1000px",
          "--hero-content-bottom": "130px",
          "--hero-content-bottom-mobile": "80px",
        }}
      >
        <div className="hero-meta">
          <BookNowButton size="lg" />
          <div className="hero-meta-text">Tue–Sun · from R90 dry, R200 wet</div>
        </div>
      </Hero>

      <div className="wp-attractions-heading container">
        <span className="eyebrow">— WHAT'S IN THERE</span>
        <h2 className="headline wp-attractions-title">THE ATTRACTIONS</h2>
      </div>

      <div style={{ marginTop: "48px" }}>
        {attractions.map((a) => (
          <AttractionRow key={a.number} {...a} />
        ))}
      </div>

      <div className="wp-rates">
        <div className="wp-rates-heading">
          <span className="eyebrow eyebrow--on-dark">— WHAT IT COSTS</span>
          <h2 className="headline wp-rates-title">RATES</h2>
        </div>
        <div className="wp-rates-grid">
          <RateTable {...ratesWet} headTone="teal" />
          <RateTable {...ratesDry} headTone="tan" />
          <RateTable {...seatingOptions} headTone="yellow" />
        </div>
      </div>
      <WaveDivider amplitude="mid" fill="#fbf3e2" bg="#123b3f" />

      <div className="wp-times-rules container">
        <div>
          <h2 className="headline wp-times-title">OPENING TIMES</h2>
          <span className="wp-subhead">DAY VISITORS</span>
          <HoursList rows={dayVisitorHours} />
          <span className="wp-subhead" id="parties">
            PARTY SLOTS
          </span>
          <HoursList rows={partyHours} closedNote={closedNote} />
        </div>
        <div className="wp-rules-card">
          <h2 className="headline wp-times-title">THE RULES</h2>
          <RulesList rules={rules} />
        </div>
      </div>

      <WaveDivider amplitude="high" fill="#e9601f" bg="#fbf3e2" />
      <div className="wp-closing">
        <h2 className="headline wp-closing-title">
          SEE YOU AT
          <br />
          THE SLIDES
        </h2>
        <div className="wp-closing-btn">
          <BookNowButton size="hero" />
        </div>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
