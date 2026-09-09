import Nav from "./Nav";
import WaveDivider from "./WaveDivider";
import "./Hero.css";

/**
 * Full-bleed image hero shared by Home, Water Park and Weddings. Each page
 * tunes it via CSS custom properties (title size, height, content position)
 * rather than forking the markup.
 */
export default function Hero({
  image,
  imageAlt,
  imageFilter,
  gradient,
  grain = true,
  navVariant = "transparent",
  eyebrow,
  eyebrowVariant = "badge",
  title,
  children,
  waveAmplitude = "mid",
  waveFill = "#fbf3e2",
  vars = {},
}) {
  return (
    <div className="hero" style={vars}>
      <img
        className="hero-img"
        src={image}
        alt={imageAlt}
        style={imageFilter ? { filter: imageFilter } : undefined}
      />
      <div className="hero-overlay" style={{ background: gradient }} />
      {grain && <div className="hero-grain" />}
      <Nav variant={navVariant} />
      <div className="hero-content">
        {eyebrow && (
          <span
            className={
              "eyebrow " +
              (eyebrowVariant === "badge" ? "eyebrow--badge" : "eyebrow--plain-accent")
            }
          >
            {eyebrow}
          </span>
        )}
        <h1 className="hero-title">{title}</h1>
        {children}
      </div>
      <WaveDivider
        className="hero-wave"
        amplitude={waveAmplitude}
        fill={waveFill}
      />
    </div>
  );
}
