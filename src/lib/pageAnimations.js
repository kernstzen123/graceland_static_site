// Scroll choreography applied to every page from one place, keyed off the
// classes the components already use — so each page gets the same motion
// language without per-page animation code.
import { gsap, ScrollTrigger, introDone, prefersReducedMotion } from "./motion";

const STAGGER_GROUPS = [
  ".rate-table",
  ".wr-card",
  ".wr-extra",
  ".setting-stat",
  ".stats-item",
  ".rules-row",
  ".hours-row",
  ".parties-includes-list li",
  ".visit-contact-list > div",
  ".attraction-copy > *",
  ".footer-grid > *",
];

const PARALLAX_IMAGES = [
  ".story-image-wrap img",
  ".setting-images img",
  ".attraction-media img",
  ".gallery-grid img",
  ".gallery-page-grid img",
];

const REVEAL_BLOCKS = [
  ".hours-today",
  ".wp-rules-card",
  ".parties-rules-card",
  ".visit-map",
  ".legal-content",
];

function countUp(el) {
  // Keep the real value on the element so a re-run (StrictMode, HMR) after a
  // revert never parses a half-counted number.
  if (!el.dataset.countTo) el.dataset.countTo = el.textContent;
  const raw = el.dataset.countTo;
  const m = raw.match(/^(\D*)([\d\s]+)(.*)$/);
  if (!m) return;
  const [, pre, num, post] = m;
  const target = parseInt(num.replace(/\s/g, ""), 10);
  if (!Number.isFinite(target) || target < 2) return;
  const restore = () => (el.textContent = raw);
  const spaced = /\s/.test(num.trim());
  const fmt = (v) => {
    const n = Math.round(v);
    return pre + (spaced ? n.toLocaleString("en-ZA").replace(/[, ]/g, " ") : String(n)) + post;
  };
  // years count from a nearby start so 2012 doesn't spin up from zero
  const from = target > 1900 && target < 2100 ? target - 40 : 0;
  const obj = { v: from };
  el.textContent = fmt(from);
  const tween = gsap.to(obj, {
    v: target,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
    onUpdate: () => (el.textContent = fmt(obj.v)),
    onComplete: restore,
  });
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    restore();
  };
}

export function initPageAnimations(root) {
  if (!root || prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const q = (sel) => gsap.utils.toArray(root.querySelectorAll(sel));

    // --- Headlines: masked char-by-char rise -------------------------------
    q('[data-split="scroll"]').forEach((el) => {
      const chars = el.querySelectorAll(".split-char");
      gsap.fromTo(chars, { yPercent: 115, rotate: 8, opacity: 0 }, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: { each: 0.022, from: "start" },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // Hero headline + its companions play once the intro curtain lifts.
    const heroChars = q('[data-split="hero"] .split-char');
    const heroBits = q(".hero-content .eyebrow, .hero-content .hero-body, .hero-content .hero-meta > *");
    if (heroChars.length) {
      gsap.set(heroChars, { yPercent: 120, rotate: 10, opacity: 0 });
      gsap.set(heroBits, { y: 30, opacity: 0 });
      introDone.then(() => {
        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(heroChars, {
          yPercent: 0, rotate: 0, opacity: 1,
          duration: 1.3, ease: "expo.out", stagger: 0.03,
        }).to(heroBits, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 }, "-=0.9");
      });
    }

    // Hero exits: content drifts up and fades as the page scrolls past it.
    q(".hero").forEach((hero) => {
      const content = hero.querySelector(".hero-content");
      if (!content) return;
      gsap.to(content, {
        yPercent: -30,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
    });

    // --- Eyebrows: wipe in from the left ------------------------------------
    q(".eyebrow").forEach((el) => {
      if (el.closest(".hero-content")) return;
      gsap.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)", x: -20 }, {
        clipPath: "inset(0% 0% 0% 0%)",
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    // --- Staggered groups: cards, rows, list items ---------------------------
    STAGGER_GROUPS.forEach((sel) => {
      const items = q(sel).filter((el) => !el.closest(".hero-content"));
      if (!items.length) return;
      gsap.set(items, { y: 46, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true,
            clearProps: "transform",
          }),
      });
    });

    // --- Images: curtain reveal + inner parallax via object-position ---------
    q(PARALLAX_IMAGES.join(",")).forEach((img) => {
      gsap.fromTo(
        img,
        { clipPath: "inset(18% 8% 18% 8%)", filter: "saturate(0.2) brightness(1.1)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          filter: "saturate(1) brightness(1)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: img, start: "top 88%", once: true },
        }
      );
      gsap.fromTo(
        img,
        { objectPosition: "50% 15%" },
        {
          objectPosition: "50% 85%",
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // Split panels on Home: images drift inside their frames.
    q(".split-panel img").forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -8, scale: 1.18 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    q(".split-panel-content").forEach((el) => {
      gsap.fromTo(el.children, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    });

    // --- Block reveals: rise + slight tilt settle -----------------------------
    q(REVEAL_BLOCKS.join(",")).forEach((el) => {
      gsap.fromTo(el, { y: 70, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    // Story badge bobs on scroll.
    q(".story-badge").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, rotate: -6 },
        {
          y: -30, rotate: 3, ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // Wave dividers swell as they pass through the viewport.
    q(".wave").forEach((el) => {
      gsap.fromTo(
        el.querySelector(".wave-front"),
        { scaleY: 0.35 },
        {
          scaleY: 1.15, ease: "none", transformOrigin: "50% 100%",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 40%", scrub: true },
        }
      );
    });

    // --- Numbers count up ----------------------------------------------------
    const counters = q(".stats-value, .setting-stat-value, .wr-card-price-value").map(countUp);

    // Footer wordmark letters rise as you reach the bottom.
    q(".footer-wordmark").forEach((el) => {
      gsap.fromTo(el.querySelectorAll(".split-char"), { yPercent: 100 }, {
        yPercent: 0,
        ease: "expo.out",
        duration: 1.4,
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: "top 98%", once: true },
      });
    });
    return () => counters.forEach((undo) => undo?.());
  }, root);

  // Images loading late shift trigger positions; re-measure once they land.
  const imgs = root.querySelectorAll("img");
  const refresh = () => ScrollTrigger.refresh();
  imgs.forEach((img) => !img.complete && img.addEventListener("load", refresh, { once: true }));
  const t = setTimeout(refresh, 400);

  return () => {
    clearTimeout(t);
    imgs.forEach((img) => img.removeEventListener("load", refresh));
    ctx.revert();
  };
}
