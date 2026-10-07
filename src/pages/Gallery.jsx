import { useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LaneRope from "../components/LaneRope";
import ClosingPool from "../components/ClosingPool";
import SplitText from "../components/SplitText";
import { gsap, prefersReducedMotion } from "../lib/motion";
import "./Gallery.css";

const ALL_PHOTOS = [
  { src: "/assets/waterslide.jpg", alt: "The four waterslides" },
  { src: "/assets/beach-rock-pool.jpg", alt: "Beach pool and rock pool" },
  { src: "/assets/bath-pool.jpg", alt: "The bath pool" },
  { src: "/assets/toddler-boat.jpg", alt: "Toddler boat slide" },
  { src: "/assets/park.jpg", alt: "Cake time at a kids' party" },
  { src: "/assets/gardens.jpg", alt: "Life jackets on in the rock pool" },
  { src: "/assets/boma-1.jpg", alt: "Round the fire at the boma" },
  { src: "/assets/boma-2.jpg", alt: "Thatched huts and lawns at dusk" },
  { src: "/assets/venue-1.jpg", alt: "Exchanging rings" },
  { src: "/assets/venue-2.jpg", alt: "The rock garden" },
  { src: "/assets/venue-3.jpg", alt: "A bridal bouquet" },
  { src: "/assets/wedding.jpg", alt: "A bride at the garden arch" },
];

const tilt = () => (Math.random() - 0.5) * 9;

/**
 * Snapshots scattered on the pool deck. With a mouse you can pick them up,
 * drag them around and drop them; "Shuffle" scatters them again.
 */
export default function Gallery() {
  const deck = useRef(null);

  useEffect(() => {
    const root = deck.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!root || !fine || prefersReducedMotion()) return;
    const snaps = [...root.querySelectorAll(".deck-snap")];
    snaps.forEach((el) => gsap.set(el, { rotation: tilt() }));
    let z = 10;
    let drag = null;

    const down = (e) => {
      const el = e.target.closest(".deck-snap");
      if (!el) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      el.style.zIndex = ++z;
      drag = {
        el,
        id: e.pointerId,
        sx: e.clientX,
        sy: e.clientY,
        x: gsap.getProperty(el, "x"),
        y: gsap.getProperty(el, "y"),
        lastX: e.clientX,
      };
      el.classList.add("is-held");
      gsap.to(el, { scale: 1.06, rotation: 0, duration: 0.3, ease: "back.out(2)" });
    };
    const move = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const vx = e.clientX - drag.lastX;
      drag.lastX = e.clientX;
      gsap.set(drag.el, { x: drag.x + e.clientX - drag.sx, y: drag.y + e.clientY - drag.sy });
      gsap.to(drag.el, { rotation: Math.max(-14, Math.min(14, vx * 1.4)), duration: 0.3, overwrite: "auto" });
    };
    const up = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag.el.classList.remove("is-held");
      gsap.to(drag.el, { scale: 1, rotation: tilt(), duration: 0.8, ease: "elastic.out(1, 0.5)" });
      drag = null;
    };
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    return () => {
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      gsap.set(snaps, { clearProps: "transform,zIndex" });
    };
  }, []);

  const shuffle = () => {
    const snaps = deck.current?.querySelectorAll(".deck-snap");
    if (!snaps) return;
    gsap.to(snaps, {
      x: 0,
      y: 0,
      rotation: () => tilt(),
      duration: 0.9,
      ease: "elastic.out(1, 0.6)",
      stagger: { each: 0.03, from: "random" },
    });
  };

  return (
    <main id="main" className="gallery-page">
      <Nav variant="teal" />

      <div className="page-title tiles">
        <div className="container gallery-title-row">
          <div>
            <span className="eyebrow">The place, unfiltered</span>
            <SplitText as="h1" className="headline page-title-text" split="hero">
              Photos
            </SplitText>
          </div>
          <p className="gallery-hint">
            Grab a photo and move it around.
            <button type="button" className="gallery-shuffle" onClick={shuffle}>
              Tidy them up
            </button>
          </p>
        </div>
      </div>
      <LaneRope top="var(--pool)" bottom="var(--foam)" />

      <div className="gallery-deck container" ref={deck}>
        {ALL_PHOTOS.map((img) => (
          <figure className="deck-snap" key={img.src}>
            <img src={img.src} alt={img.alt} loading="lazy" draggable="false" />
            <figcaption>{img.alt}</figcaption>
          </figure>
        ))}
      </div>

      <ClosingPool title="See it yourself" />

      <Footer variant="simple" />
    </main>
  );
}
