import Hero from "../components/Hero";
import WaveDivider from "../components/WaveDivider";
import Button from "../components/Button";
import BookNowButton from "../components/BookNowButton";
import Footer from "../components/Footer";
import { weddingRates, contact } from "../data/content";
import "./Weddings.css";

export default function Weddings() {
  return (
    <main id="main">
      <Hero
        image="/assets/wedding.jpg"
        imageAlt="Wedding at Graceland"
        imageFilter="saturate(0.82) sepia(0.12)"
        gradient="linear-gradient(180deg, rgba(18,59,63,0.62) 0%, rgba(18,59,63,0.10) 45%, rgba(18,59,63,0.72) 100%)"
        navVariant="transparent"
        eyebrow="WEDDINGS · CORPORATE · PRIVATE FUNCTIONS"
        eyebrowVariant="plain"
        title={
          <>
            MARRIED
            <br />
            UNDER THE
            <br />
            MOUNTAIN
          </>
        }
        waveAmplitude="low"
        vars={{
          "--hero-height": "800px",
          "--hero-height-mobile": "560px",
          "--hero-title-min": "40px",
          "--hero-title-max": "124px",
          "--hero-content-max": "900px",
          "--hero-content-bottom": "140px",
          "--hero-content-bottom-mobile": "80px",
        }}
      >
        <p className="hero-body">
          Venue Hall seats 180. Garden ceremony under the pergola, beside the
          waterfall feature. Twenty minutes out of Paarl.
        </p>
        <div className="hero-meta">
          <BookNowButton variant="primary" size="lg" />
        </div>
      </Hero>

      <div className="setting container">
        <div>
          <span className="eyebrow">— THE SETTING</span>
          <h2 className="headline setting-title">
            A GARDEN,
            <br />
            A WATERFALL,
            <br />A RED CARPET
          </h2>
          <p className="setting-body">
            The garden ceremony includes the pergola, waterfall feature, red
            carpet and white chairs. A serene sanctuary with a lush garden
            sprinkled with mystical rocks, handpicked by the owner herself.
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
          <img src="/assets/venue-1.jpg" alt="Graceland venue" />
          <img src="/assets/venue-2.jpg" alt="Graceland venue detail" />
        </div>
      </div>

      <WaveDivider amplitude="low" fill="#123b3f" bg="#fbf3e2" />
      <div className="wr-section">
        <div className="wr-heading">
          <span className="eyebrow eyebrow--on-dark">— {weddingRates.period}</span>
          <h2 className="headline wr-title">WEDDING RATES</h2>
        </div>
        <div className="wr-cards">
          <div className="wr-card">
            <div className="wr-card-title">RECEPTION</div>
            <div className="wr-card-price">
              <div className="wr-card-price-value">{weddingRates.reception.price}</div>
              <div className="wr-card-price-unit">{weddingRates.reception.unit}</div>
            </div>
            <div className="wr-card-min">{weddingRates.reception.minimum}</div>
          </div>
          <div className="wr-card">
            <div className="wr-card-title">CEREMONY</div>
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
      <WaveDivider amplitude="low" bg="#123b3f" fill="#fbf3e2" />

      <div className="weddings-closing container">
        <h2 className="headline weddings-closing-title">COME AND SEE IT</h2>
        <p className="weddings-closing-sub">
          Walk the garden with Conny. No forms — just ring or write.
        </p>
        <div className="weddings-closing-actions">
          <BookNowButton variant="primary" size="lg" />
          <Button variant="ghost" size="lg" href={contact.phoneHref}>
            {contact.phone}
          </Button>
        </div>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
