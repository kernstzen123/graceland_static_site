import "./WaterEdge.css";

/**
 * Section divider: a soft water line where one colour block meets the next
 * (`top` above, `bottom` below). Two gentle swells drift past each other.
 */
const SWELL = "M0,40 C120,22 240,22 360,40 C480,58 600,58 720,40 C840,22 960,22 1080,40 C1200,58 1320,58 1440,40 L1440,80 L0,80 Z";

export default function WaterEdge({ top = "var(--foam)", bottom = "var(--foam)", className = "" }) {
  return (
    <div className={`water-edge ${className}`} aria-hidden="true" style={{ background: top }}>
      <svg className="water-edge-back" viewBox="0 0 2880 80" preserveAspectRatio="none" style={{ color: bottom }}>
        <path d={SWELL} fill="currentColor" />
        <path d={SWELL} fill="currentColor" transform="translate(1440 0)" />
      </svg>
      <svg className="water-edge-front" viewBox="0 0 2880 80" preserveAspectRatio="none" style={{ color: bottom }}>
        <path d={SWELL} fill="currentColor" />
        <path d={SWELL} fill="currentColor" transform="translate(1440 0)" />
      </svg>
    </div>
  );
}
