import { Link } from "react-router-dom";
import PoolHero from "../components/PoolHero";
import Marquee from "../components/Marquee";
import LaneRope from "../components/LaneRope";
import GalleryGrid from "../components/GalleryGrid";
import BookNowButton from "../components/BookNowButton";
import WeatherWidget from "../components/WeatherWidget";
import DayPlanner from "../components/DayPlanner";
import HoursPicker from "../components/HoursPicker";
import ClosingPool from "../components/ClosingPool";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";
import { story, ratesWet, contact } from "../data/content";
import { getTodayHours } from "../lib/hours";
import "./Home.css";

const GALLERY = [
  { src: "/assets/park.jpg", alt: "Cake time at a kids' party" },
  { src: "/assets/bath-pool.jpg", alt: "The bath pool" },
  { src: "/assets/boma-1.jpg", alt: "Round the fire at the boma" },
];

export default function Home() {
  const today = getTodayHours();
  const price = (label) => ratesWet.rows.find((r) => r.label === label).price;

  const DAYS_OUT = [
    {
      key: "water-park",
      image: "/assets/waterslide.jpg",
      alt: "The four waterslides",
      title: "Water park",
      body: `Four slides, three pools and a splash pad. Adults ${price("Adults")}, kids ${price("Children 3–17")}.`,
      cta: "See the park",
      to: "/water-park",
      tone: "pool",
    },
    {
      key: "parties",
      image: "/assets/toddler-boat.jpg",
      alt: "The toddler boat slide",
      title: "Kids' parties",
      body: "Two-hour slots, Tuesday to Sunday. Bring the cake, we'll bring the slides.",
      cta: "Party packages",
      to: "/parties",
      tone: "lilo",
    },
    {
      key: "weddings",
      image: "/assets/wedding.jpg",
      alt: "A bride at the garden arch",
      title: "Weddings",
      body: "The hall seats 180. Garden ceremonies under the pergola, by the waterfall.",
      cta: "Wedding rates",
      to: "/weddings",
      tone: "lemon",
    },
  ];

  return (
    <main id="main">
      <PoolHero
        eyebrow="Paarl · Western Cape · since 2012"
        title={
          <>
            Jump
            <br />
            right in
          </>
        }
        next="var(--foam)"
      >
        <p className="pool-hero-sub">
          Four waterslides, three pools, a toddler splash pad and two play villages, down Lustigan Road in Paarl.
        </p>
        <div className="hero-meta">
          <BookNowButton size="lg" />
          <div className="hero-meta-text">
            {today.isOpenDay ? `Open today ${today.hours}` : "Phone ahead for today's hours"}
            <br />
            <span>
              Adults {price("Adults")} · kids 3–17 {price("Children 3–17")}
            </span>
          </div>
        </div>
      </PoolHero>

      <Marquee />

      <section className="story container">
        <div className="story-copy">
          <span className="eyebrow">The place</span>
          <SplitText as="h2" className="headline story-title">
            Handpicked rocks and loud kids
          </SplitText>
          <p className="story-body">{story}</p>
        </div>
        <div className="story-image-wrap">
          <img src="/assets/gardens.jpg" alt="Kids in life jackets at the rock pool" />
          <div className="story-badge">Mountain views, all day</div>
        </div>
      </section>

      <section className="days-out container" aria-labelledby="days-out-title">
        <div className="section-head">
          <span className="eyebrow">Three ways in</span>
          <SplitText as="h2" className="headline section-title" id="days-out-title">
            Pick your kind of day
          </SplitText>
        </div>
        <div className="split">
          {DAYS_OUT.map((d) => (
            <Link className={`split-panel split-panel--${d.tone}`} key={d.key} to={d.to}>
              <div className="split-panel-photo">
                <img src={d.image} alt={d.alt} />
              </div>
              <div className="split-panel-content">
                <h3 className="split-panel-title">{d.title}</h3>
                <p className="split-panel-body">{d.body}</p>
                <span className="split-panel-cta">
                  {d.cta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LaneRope top="var(--foam)" bottom="var(--deep)" />
      <section className="planner tiles--deep" aria-labelledby="planner-title">
        <div className="planner-inner container">
          <div className="planner-copy">
            <span className="eyebrow eyebrow--on-dark">Plan your day</span>
            <SplitText as="h2" className="headline headline--cream planner-title" id="planner-title">
              What will the day cost?
            </SplitText>
            <p className="planner-lede">
              Add everyone who's coming and switch between a full water day and the dry play villages. Under-ones
              always swim free.
            </p>
          </div>
          <DayPlanner />
        </div>
      </section>
      <LaneRope top="var(--deep)" bottom="var(--foam)" />

      <section className="gallery-section container">
        <div className="gallery-heading">
          <div>
            <span className="eyebrow">A 34° afternoon</span>
            <SplitText as="h2" className="headline section-title">
              The place, unfiltered
            </SplitText>
          </div>
          <Link to="/gallery" className="text-link">
            See all the photos →
          </Link>
        </div>
        <GalleryGrid images={GALLERY} />
      </section>

      <section className="hours-today container" aria-labelledby="hours-title">
        <div className="hours-today-main">
          <span className="eyebrow">Opening times</span>
          <SplitText as="h2" className="headline section-title" id="hours-title">
            Can we swim on…
          </SplitText>
          <div className="hours-today-picker">
            <HoursPicker />
          </div>
        </div>
        <aside className="hours-today-side">
          <WeatherWidget />
          <p className="hours-today-call">
            Not sure? Ring Conny on <a href={contact.phoneHref}>{contact.phone}</a>.
          </p>
        </aside>
      </section>

      <ClosingPool
        title="Come get wet"
        sub={`No forms, no fuss. Ring Conny on ${contact.phone} or book online.`}
      />

      <Footer variant="full" />
    </main>
  );
}
