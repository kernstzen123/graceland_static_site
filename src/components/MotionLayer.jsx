import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/motion";
import "./MotionLayer.css";

const POOL_DEPTH_M = 3.2;

/**
 * Site-wide chrome: a pool depth gauge that fills as you scroll down the page
 * (desktop), and air bubbles that rise off the pointer while it's over water.
 */
export default function MotionLayer() {
  const fillRef = useRef(null);
  const depthRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(fillRef.current, { scaleY: self.progress });
        if (depthRef.current) depthRef.current.textContent = (self.progress * POOL_DEPTH_M).toFixed(1);
      },
    });

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return () => st.kill();

    let last = 0;
    let live = 0;
    const onMove = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t?.closest("[data-bubbles]") || t.closest("a, button")) return;
      const now = performance.now();
      if (now - last < 45 || live > 28) return;
      last = now;
      live++;
      const b = document.createElement("span");
      const size = 6 + Math.random() * 14;
      b.className = "bubble-trail";
      Object.assign(b.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${e.clientX - size / 2}px`,
        top: `${e.clientY - size / 2}px`,
      });
      document.body.appendChild(b);
      gsap.fromTo(
        b,
        { scale: 0.3, opacity: 1 },
        {
          y: -(50 + Math.random() * 90),
          x: (Math.random() - 0.5) * 50,
          scale: 1,
          opacity: 0,
          duration: 0.9 + Math.random() * 0.6,
          ease: "power1.out",
          onComplete: () => {
            b.remove();
            live--;
          },
        }
      );
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      st.kill();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="depth-gauge" aria-hidden="true">
      <span className="depth-gauge-label">Depth</span>
      <div className="depth-gauge-tube">
        <i ref={fillRef} />
      </div>
      <span className="depth-gauge-value">
        <b ref={depthRef}>0.0</b> m
      </span>
    </div>
  );
}
