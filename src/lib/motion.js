// Shared motion runtime: one Lenis instance driving native scroll, synced to
// GSAP's ticker so ScrollTrigger and smooth scroll never disagree.
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis = null;

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  lenis.on("scroll", ScrollTrigger.update);
  // Keep GSAP's default lag smoothing: route changes mount a whole page in one
  // long frame, and without it every running timeline would jump ahead.
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  return lenis;
}

export const getLenis = () => lenis;

/** Scroll to a target (number | element) through Lenis when it's running. */
export function scrollTo(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, force: true });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  } else if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
  document.documentElement.classList.toggle("is-scroll-locked", locked);
}

/** Current scroll velocity (px/frame-ish), 0 when Lenis is off. */
export const getVelocity = () => (lenis ? lenis.velocity : 0);

// The intro (preloader) resolves this; hero animations wait on it so the
// headline reveal plays once the curtain lifts, not behind it.
let resolveIntro;
export const introDone = new Promise((r) => (resolveIntro = r));
export const markIntroDone = () => resolveIntro();
