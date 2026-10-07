import { useState } from "react";
import Nav from "./Nav";
import LaneRope from "./LaneRope";
import PoolSurface from "./PoolSurface";
import SplitText from "./SplitText";
import "./PoolHero.css";

/**
 * Home hero: the whole screen is the pool. Tap or click the water to make a
 * splash; the headline letters float on it like inflatables and rock on the
 * waves you make.
 */
export default function PoolHero({ eyebrow, title, children, next = "var(--foam)" }) {
  const [splashed, setSplashed] = useState(false);
  return (
    <section className="pool-hero" data-bubbles aria-label="Welcome">
      <PoolSurface
        floatSelector=".pool-hero-title .split-char"
        splashOnEnter
        onSplash={() => setSplashed(true)}
      />
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
      <LaneRope className="pool-hero-rope" top="transparent" bottom={next} />
    </section>
  );
}
