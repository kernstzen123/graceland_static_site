import Nav from "./Nav";
import WaveDivider from "./WaveDivider";
import ShaderCanvas from "./ShaderCanvas";
import SplitText from "./SplitText";
import "./Hero.css";

/**
 * Full-bleed image hero shared by Home, Water Park, Parties and Weddings.
 * The photo is rendered twice: a plain <img> (instant paint, alt text, and
 * the fallback when WebGL is unavailable) and a liquid WebGL layer on top
 * that ripples under the cursor and warps as the page scrolls.
 * Each page tunes it via CSS custom properties rather than forking markup.
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
  const filter = imageFilter ? { filter: imageFilter } : undefined;
  return (
    <div className="hero" style={vars}>
      <img className="hero-img" src={image} alt={imageAlt} style={filter} />
      <ShaderCanvas variant="water" image={image} style={filter} />
      <div className="hero-overlay" style={{ background: gradient }} />
      {grain && <div className="hero-grain" />}
      <div className="hero-glow" aria-hidden="true" />
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
        <SplitText as="h1" className="hero-title" split="hero">
          {title}
        </SplitText>
        {children}
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span>SCROLL</span>
        <i />
      </div>
      <WaveDivider className="hero-wave" amplitude={waveAmplitude} fill={waveFill} />
    </div>
  );
}
