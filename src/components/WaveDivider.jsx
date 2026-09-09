// Authored SVG wave dividers — one curve family at three amplitudes, per the
// brief ("section dividers explicit... authored SVG wave shapes, not a CSS
// skew"). Reused everywhere a colour block hands off to the next.
const PATHS = {
  low: "M0,55 C240,35 480,35 720,50 C960,65 1200,65 1440,50 L1440,100 L0,100 Z",
  mid: "M0,60 C144,12 288,10 432,46 C576,82 720,94 864,66 C1008,38 1152,16 1296,34 C1368,42 1416,54 1440,60 L1440,100 L0,100 Z",
  high: "M0,50 C180,2 360,2 540,42 C720,82 900,92 1080,56 C1260,20 1380,28 1440,42 L1440,100 L0,100 Z",
};

export default function WaveDivider({
  amplitude = "mid",
  fill,
  bg = "transparent",
  flip = false,
  height = 100,
  className,
}) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height,
        background: bg,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <path d={PATHS[amplitude]} fill={fill} />
    </svg>
  );
}
