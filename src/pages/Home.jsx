import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import StatsBand from "../components/StatsBand";
import WaveDivider from "../components/WaveDivider";
import GalleryGrid from "../components/GalleryGrid";
import HoursList from "../components/HoursList";
import BookNowButton from "../components/BookNowButton";
import WeatherWidget from "../components/WeatherWidget";
import Footer from "../components/Footer";
import { dayVisitorHours, story, ratesWet } from "../data/content";
import { getTodayHours } from "../lib/hours";
import "./Home.css";

const SPLIT = [
  {
    key: "water-park",
    image: "/assets/waterslide.jpg",
    alt: "Waterslide",
    title: "WATER PARK",
    body: "Four slides, three pools and a splash pad. Adults R215.",
    cta: "See the park",
    to: "/water-park",
    overlay: "linear-gradient(180deg, rgba(46,154,163,0.15), rgba(18,59,63,0.85))",
  },
  {
    key: "parties",
    image: "/assets/toddler-boat.jpg",
    alt: "Toddler boat slide",
    title: "PARTIES",
    body: "Two-hour slots, Tue–Sun. Picnic baskets welcome.",
    cta: "Party times",
    to: "/water-park#parties",
    overlay: "linear-gradient(180deg, rgba(233,96,31,0.12), rgba(42,18,6,0.85))",
  },
  {
    key: "weddings",
    image: "/assets/wedding.jpg",
    alt: "Wedding at Graceland",
    title: "WEDDINGS",
    body: "Hall seats 180. Garden ceremony under the pergola.",
    cta: "Wedding rates",
    to: "/weddings",
    overlay: "linear-gradient(180deg, rgba(18,59,63,0.10), rgba(18,59,63,0.86))",
  },
];

const GALLERY = [
  { src: "/assets/park.jpg", alt: "Picnic lawns and play villages" },
  { src: "/assets/bath-pool.jpg", alt: "Bath pool" },
  { src: "/assets/boma-1.jpg", alt: "Boma" },
];

export default function Home() {
  const today = getTodayHours();
  const adultsPrice = ratesWet.rows.find((r) => r.label === "Adults").price;
  const childrenPrice = ratesWet.rows.find((r) => r.label === "Children 3–17").price;

  return (
    <main id="main">
      <Hero
        image="/assets/beach-rock-pool.jpg"
        imageAlt="Beach and rock pool at Graceland"
        imageFilter="saturate(0.88) contrast(1.04) sepia(0.14)"
        gradient="linear-gradient(180deg, rgba(18,59,63,0.70) 0%, rgba(18,59,63,0.12) 40%, rgba(42,18,6,0.62) 100%)"
        navVariant="transparent"
        eyebrow="PAARL · WESTERN CAPE · SINCE 2012"
        title={
          <>
            SLIDE INTO
            <br />
            YOUR SATURDAY
          </>
        }
        waveAmplitude="mid"
        vars={{
          "--hero-height": "880px",
          "--hero-height-mobile": "620px",
          "--hero-title-min": "46px",
          "--hero-title-max": "146px",
          "--hero-content-max": "960px",
          "--hero-content-bottom": "150px",
          "--hero-content-bottom-mobile": "96px",
        }}
      >
        <div className="hero-meta">
          <BookNowButton variant="primary" size="lg" />
          <div className="hero-meta-text">
            {today.isOpenDay ? `Open today ${today.hours}` : "Call to confirm today's hours"}
            <br />
            <span>
              Adults {adultsPrice} · Children 3–17 {childrenPrice}
            </span>
          </div>
        </div>
      </Hero>

      <Marquee />

      <section className="story container">
        <div>
          <span className="eyebrow">— THE PLACE</span>
          <h2 className="headline story-title">
            HANDPICKED
            <br />
            ROCKS AND
            <br />
            LOUD KIDS
          </h2>
          <p className="story-body">{story}</p>
          <span className="text-link">Our story →</span>
        </div>
        <div className="story-image-wrap">
          <img src="/assets/gardens.jpg" alt="Gardens with mountain views" />
          <div className="story-badge">MOUNTAIN VIEWS, ALL DAY</div>
        </div>
      </section>

      <div className="split">
        {SPLIT.map((panel) => (
          <div className="split-panel" key={panel.key}>
            <img src={panel.image} alt={panel.alt} />
            <div className="split-panel-overlay" style={{ background: panel.overlay }} />
            <div className="split-panel-content">
              <h3 className="headline headline--cream split-panel-title">{panel.title}</h3>
              <p className="split-panel-body">{panel.body}</p>
              <Link className="btn btn-booknow btn-sm split-panel-cta" to={panel.to}>
                {panel.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <StatsBand />
      <WaveDivider amplitude="mid" fill="#fbf3e2" bg="#123b3f" />

      <section className="gallery-section container">
        <div className="gallery-heading">
          <div>
            <span className="eyebrow">— A 34° AFTERNOON</span>
            <h2 className="headline gallery-title">THE PLACE, UNFILTERED</h2>
          </div>
          <Link to="/gallery" className="text-link">All photos →</Link>
        </div>
        <GalleryGrid images={GALLERY} />
      </section>

      <div className="hours-today container">
        <div className="hours-today-main">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
            <div>
              <span className="eyebrow">— TODAY, {today.dayName.toUpperCase()}</span>
              <div className="hours-today-time">
                {today.isOpenDay ? (
                  today.hours.split("–").map((t, i) => (
                    <span key={i}>
                      {t}
                      {i === 0 && <br />}
                    </span>
                  ))
                ) : (
                  "CALL TO CONFIRM"
                )}
              </div>
              <div className="hours-today-note">
                {today.isOpenDay
                  ? `Gates close ${today.gatesClose}. Last slide ${today.lastSlide}.`
                  : today.note}
              </div>
            </div>
            <WeatherWidget />
          </div>
        </div>
        <div className="hours-today-side">
          <div className="hours-today-side-title">DAY VISITOR HOURS</div>
          <HoursList rows={dayVisitorHours} />
        </div>
      </div>

      <div className="closing-cta-wrap">
        <WaveDivider amplitude="high" fill="#e9601f" bg="#fbf3e2" />
        <div className="closing-cta">
          <h2 className="headline closing-cta-title">COME GET WET</h2>
          <p className="closing-cta-sub">
            No forms, no fuss. Ring Conny on 072 264 4009 or book online.
          </p>
          <div className="closing-cta-btn">
            <BookNowButton size="hero" />
          </div>
        </div>
      </div>

      <Footer variant="full" />
    </main>
  );
}
