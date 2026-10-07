import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { nav } from "../data/content";
import "./RouteTransition.css";

const EXTRA = { "/": "Home", "/gallery": "Gallery", "/privacy": "Privacy", "/terms": "Terms" };

/** On every navigation after the first, a tangerine panel with a wave edge
 *  sweeps up off the new page, carrying the destination's name. */
export default function RouteTransition() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  const root = useRef(null);
  const label = useRef(null);

  // Layout effect: cover the new page before its first paint, then lift.
  useLayoutEffect(() => {
    // Compare against the last path (not a "first run" flag) so StrictMode's
    // mount replay doesn't play a transition on initial load.
    if (prev.current === pathname) return;
    prev.current = pathname;
    if (prefersReducedMotion() || !root.current) return;
    const name = EXTRA[pathname] || nav.find((n) => n.to === pathname)?.label || "Graceland";
    label.current.textContent = name.toUpperCase();
    gsap.set(root.current, { yPercent: 0, autoAlpha: 1 });
    // Start the lift once the new page has mounted and painted, so a heavy
    // first frame doesn't eat the animation.
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(label.current, { yPercent: 0, opacity: 1 }, { yPercent: -60, opacity: 0, duration: 0.5, ease: "power3.in", delay: 0.15 })
      .to(root.current, { yPercent: -115, duration: 0.95, ease: "expo.inOut" }, "-=0.25")
      .set(root.current, { autoAlpha: 0 });
    let raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => tl.play())));
    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
    };
  }, [pathname]);

  return (
    <div className="route-transition" ref={root} aria-hidden="true">
      <span className="route-transition-label" ref={label} />
      <svg className="route-transition-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,0 L1440,0 L1440,50 C1260,90 1080,96 900,58 C720,20 540,8 360,40 C180,72 60,64 0,46 Z" fill="#e9601f" />
      </svg>
    </div>
  );
}
