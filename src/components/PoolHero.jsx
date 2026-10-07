import { useState } from "react";
import Nav from "./Nav";
import WaterEdge from "./WaterEdge";
import PoolSurface from "./PoolSurface";
import SplitText from "./SplitText";
import "./PoolHero.css";

/**
 * Home hero: a full-screen photo of the real pool at Graceland, seen through
 * live water. Tap or click to make a splash; the headline letters float like
 * inflatables and rock on the waves you make.
 */
export default function PoolHero({ image, imageAlt, eyebrow, title, children, next = "var(--foam)" }) {
  const [splashed, setSplashed] = useState(false);
  return (
    <section className="pool-hero" data-bubbles aria-label="Welcome">
      <img className="pool-hero-img" src={image} alt={imageAlt} fetchpriority="high" />
      <PoolSurface
        image={image}
        floatSelector=".pool-hero-title .split-char"
        splashOnEnter
        onSplash={() => setSplashed(true)}
      />
      <div className="pool-hero-shade" aria-hidden="true" />
      <Nav variant="transparent" />
      <div className="pool-hero-content container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <SplitText as="h1" className="pool-hero-title" split="hero">
          {title}
        </SplitText>
        {children}
      </div>
      <p className={"pool-hero-hint" + (splashed ? " is-done" : "")} aria-hidden="true">
        <span className="pool-hero-hint-dot" />
        Tap the water
      </p>
      <WaterEdge className="pool-hero-edge" top="transparent" bottom={next} />
    </section>
  );
}
