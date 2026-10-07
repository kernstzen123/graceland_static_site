import { useLayoutEffect, useRef } from "react";
import { initPageAnimations } from "../lib/pageAnimations";

/** Wraps the routed page; (re)builds its scroll choreography per route. */
export default function PageMotion({ children }) {
  const ref = useRef(null);
  useLayoutEffect(() => initPageAnimations(ref.current), []);
  return (
    <div className="page" ref={ref}>
      {children}
    </div>
  );
}
