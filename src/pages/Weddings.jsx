import Hero from "../components/Hero";
import LaneRope from "../components/LaneRope";
import Button from "../components/Button";
import BookNowButton from "../components/BookNowButton";
import ClosingPool from "../components/ClosingPool";
import SplitText from "../components/SplitText";
import Footer from "../components/Footer";
import { weddingRates, contact } from "../data/content";
import "./Weddings.css";

export default function Weddings() {
  return (
    <main id="main">
      <Hero
        image="/assets/wedding.jpg"
        imageAlt="A bride under the garden arch at Graceland"
        eyebrow="Weddings · corporate · private functions"
        title={
          <>
            Married
            <br />
            under the
            <br />
            mountain
          </>
        }
        sticker="Hall seats 180"
      >
        <p className="hero-body">
          A garden ceremony under the pergola, beside the waterfall, then a reception in the Venue Hall.
        </p>
        <div className="hero-meta">
          <BookNowButton size="lg" />
        </div>
      </Hero>

      <section className="setting sec container">
        <div>
          <span className="eyebrow">The setting</span>
          <SplitText as="h2" className="headline section-title">
            A garden, a waterfall, a red carpet
          </SplitText>
          <p className="setting-body">
            The garden ceremony includes the pergola, waterfall feature, red carpet and white chairs. A serene
            sanctuary with a lush garden sprinkled with mystical rocks, handpicked by the owner herself.
          </p>
          <div className="setting-stats">
            {weddingRates.capacity.map((c) => (
              <div className="setting-stat" key={c.label}>
                <div className="setting-stat-value">{c.value}</div>
                <div className="setting-stat-label">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="setting-images">
          <img src="/assets/venue-1.jpg" alt="A couple exchanging rings" />
          <img src="/assets/venue-2.jpg" alt="The rock garden" />
        </div>
      </section>

      <LaneRope top="var(--foam)" bottom="var(--deep)" />
      <section className="deep-band tiles--deep" aria-labelledby="wr-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--on-dark">{weddingRates.period}</span>
            <SplitText as="h2" className="headline section-title" id="wr-title">
              Wedding rates
            </SplitText>
          </div>
          <div className="wr-cards">
            <div className="wr-card wr-card--pool">
              <div className="wr-card-title">Reception</div>
              <div className="wr-card-price">
                <div className="wr-card-price-value">{weddingRates.reception.price}</div>
                <div className="wr-card-price-unit">{weddingRates.reception.unit}</div>
              </div>
              <div className="wr-card-min">{weddingRates.reception.minimum}</div>
            </div>
            <div className="wr-card wr-card--lemon">
              <div className="wr-card-title">Ceremony</div>
              <div className="wr-card-price">
                <div className="wr-card-price-value">{weddingRates.ceremony.price}</div>
                <div className="wr-card-price-unit">{weddingRates.ceremony.unit}</div>
              </div>
              <div className="wr-card-min">{weddingRates.ceremony.minimum}</div>
            </div>
          </div>
          <div className="wr-extras">
            {weddingRates.extras.map((e) => (
              <div className="wr-extra" key={e.value}>
                <div className="wr-extra-value">{e.value}</div>
                <div className="wr-extra-label">{e.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LaneRope top="var(--deep)" bottom="var(--pool)" />

      <ClosingPool title="Come and see it" sub="Walk the garden with Conny. No forms, just ring or write.">
        <BookNowButton size="lg" />
        <Button variant="ghost" size="lg" href={contact.phoneHref}>
          {contact.phone}
        </Button>
      </ClosingPool>

      <Footer variant="simple" />
    </main>
  );
}
