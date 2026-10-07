import { useEffect, useRef } from "react";
import { marqueeItems } from "../data/content";
import { gsap, getVelocity, prefersReducedMotion } from "../lib/motion";
import "./Marquee.css";

/**
 * Scroll-reactive ticker: drifts on its own, speeds up and leans into the
 * scroll as you move, and reverses direction when you scroll back up.
 */
export default function Marquee() {
  const trackRef = useRef(null);
  // Rendered twice back-to-back so wrapping at -50% loops seamlessly.
  const track = [...marqueeItems, ...marqueeItems];

  useEffect(() => {
    const el = trackRef.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let dir = 1;
    let skew = 0;
    const tick = (_t, dt) => {
      const v = getVelocity();
      if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
      const half = el.scrollWidth / 2;
      x -= (0.055 + Math.min(Math.abs(v), 60) * 0.02) * dt * dir;
      if (half > 0) x = ((x % half) - half) % half;
      skew += (Math.max(-12, Math.min(12, v * -0.4)) - skew) * 0.1;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {track.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <span className="marquee-item">{item.toUpperCase()}</span>
            <span className="marquee-dot">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
