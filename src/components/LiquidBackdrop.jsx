import ShaderCanvas from "./ShaderCanvas";
import "./LiquidBackdrop.css";

const PALETTES = {
  tangerine: ["#e9601f", "#ef7a34", "#f5a64a"],
  pine: ["#123b3f", "#195055", "#2a8c94"],
};

// Deterministic so server/client and re-renders agree.
const BUBBLES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 10 + ((i * 53) % 38),
  delay: -((i * 1.7) % 11),
  duration: 9 + ((i * 2.3) % 8),
  drift: ((i % 5) - 2) * 14,
}));

/** Liquid WebGL gradient + rising bubbles, placed as the first child of a
 *  colour-block section (closing CTAs, stats band). */
export default function LiquidBackdrop({ palette = "tangerine", bubbles = true }) {
  return (
    <div className="liquid-backdrop" aria-hidden="true">
      <ShaderCanvas variant="liquid" colors={PALETTES[palette]} />
      {bubbles && (
        <div className="bubbles">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                "--drift": `${b.drift}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
