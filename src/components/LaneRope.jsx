import "./LaneRope.css";

const BEADS = 64;

/**
 * Section divider: a pool lane rope floating on the seam between two colour
 * blocks (`top` above, `bottom` below). The floats bob in a travelling wave
 * and spin when you run the pointer along them.
 */
export default function LaneRope({ top = "var(--foam)", bottom = "var(--foam)", className = "" }) {
  return (
    <div
      className={`lane-rope ${className}`}
      aria-hidden="true"
      style={{ background: `linear-gradient(${top} 50%, ${bottom} 50%)` }}
    >
      <div className="lane-rope-line" />
      <div className="lane-rope-beads">
        {Array.from({ length: BEADS }, (_, i) => (
          <span
            key={i}
            className={`lane-bead lane-bead--${i % 6 < 3 ? "lilo" : i % 6 === 3 ? "white" : "lemon"}`}
            style={{ animationDelay: `${(i % 16) * -0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}
