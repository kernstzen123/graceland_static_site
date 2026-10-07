import { useEffect, useRef, useState } from "react";
import { gsap, markIntroDone, prefersReducedMotion, lockScroll } from "../lib/motion";
import "./Preloader.css";

const WORD = "Graceland";

/** First-visit intro: letters rise, a counter fills, then the pine curtain
 *  lifts on a wave edge. Shown once per browser session. */
export default function Preloader() {
  const [show] = useState(() => {
    if (prefersReducedMotion()) return false;
    try {
      return !sessionStorage.getItem("gl-intro");
    } catch {
      return true;
    }
  });
  const [done, setDone] = useState(!show);
  const root = useRef(null);
  const count = useRef(null);

  useEffect(() => {
    if (!show) {
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem("gl-intro", "1");
    } catch {
      /* private mode — fine, intro just replays */
    }
    lockScroll(true);
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          lockScroll(false);
          setDone(true);
        },
      });
      tl.from(".preloader-char", {
        yPercent: 110,
        rotate: 12,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.045,
      })
        .to(counter, {
          v: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0.1)
        .to(".preloader-bar i", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.1)
        .to(".preloader-char", {
          yPercent: -110,
          duration: 0.6,
          ease: "expo.in",
          stagger: 0.025,
        }, "+=0.1")
        .add(markIntroDone, "-=0.15")
        .to(root.current, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "-=0.2")
        .to(".preloader-wave", { scaleY: 2.2, duration: 1.05, ease: "expo.inOut" }, "<");
    }, root);
    return () => {
      ctx.revert();
      lockScroll(false);
      markIntroDone();
    };
  }, [show]);

  if (done) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-word">
        {[...WORD].map((c, i) => (
          <span className="preloader-mask" key={i}>
            <span className="preloader-char">{c}</span>
          </span>
        ))}
      </div>
      <div className="preloader-meta">
        <span>FILLING THE POOL</span>
        <span className="preloader-count" ref={count}>
          000
        </span>
      </div>
      <div className="preloader-bar">
        <i />
      </div>
      <svg className="preloader-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          d="M0,0 L1440,0 L1440,40 C1260,80 1080,96 900,60 C720,24 540,10 360,44 C180,78 60,70 0,50 Z"
          fill="#27c1ee"
        />
      </svg>
    </div>
  );
}
