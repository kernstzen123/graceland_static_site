import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/motion";

const TILT = ".rate-table, .wr-card, .wr-extra, .wp-rules-card, .parties-rules-card";
const VIEW = ".split-panel, .gallery-grid img, .gallery-page-grid img, .attraction-media, .story-image-wrap";
const LINK = "a, button, [role='button']";

/**
 * Site-wide chrome that never changes per page: film grain, scroll progress
 * rail, cursor follower, magnetic buttons and tilt/spotlight cards. Pointer
 * behaviour is event-delegated from the document so every page gets it
 * without wiring individual components.
 */
export default function MotionLayer() {
  const cursorRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Scroll progress rail
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
    });

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return () => st.kill();

    const cursor = cursorRef.current;
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3" });
    let magnet = null;
    let tilt = null;

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      const view = t?.closest(VIEW) && !t.closest(LINK + ", .split-panel-content");
      cursor.classList.toggle("is-view", !!view);
      cursor.classList.toggle("is-link", !view && !!t?.closest(LINK));
      cursor.classList.remove("is-hidden");

      // Magnetic buttons: pull toward the pointer, spring back on leave.
      const btn = t?.closest(".btn");
      if (magnet && magnet !== btn) magnet.style.translate = "";
      magnet = btn;
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.translate = `${dx * 0.22}px ${dy * 0.3}px`;
      }

      // Tilt cards with a cursor-tracking spotlight.
      const card = t?.closest(TILT);
      if (tilt && tilt !== card) {
        tilt.classList.remove("is-tilting");
        gsap.to(tilt, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      }
      tilt = card;
      if (card) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.classList.add("is-tilting");
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        gsap.to(card, {
          rotationX: (0.5 - py) * 6,
          rotationY: (px - 0.5) * 8,
          x: -4,
          y: -6,
          transformPerspective: 900,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };
    const onLeave = () => cursor.classList.add("is-hidden");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      st.kill();
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="site-grain" aria-hidden="true" />
      <div className="cursor is-hidden" ref={cursorRef} aria-hidden="true">
        <div className="cursor-ring">
          <span className="cursor-label">LOOK</span>
        </div>
      </div>
    </>
  );
}
