import { marqueeItems } from "../data/content";
import "./Marquee.css";

export default function Marquee() {
  // Rendered twice back-to-back so the CSS animation (-50%) loops seamlessly.
  const track = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "34px" }}>
            <span className="marquee-item">{item.toUpperCase()}</span>
            <span className="marquee-dot">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
