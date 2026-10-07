import Nav from "./Nav";
import WaterEdge from "./WaterEdge";
import ShaderCanvas from "./ShaderCanvas";
import SplitText from "./SplitText";
import "./Hero.css";

/**
 * Inner-page hero: headline on pool blue, the page's photo in a tilted
 * float-edged frame whose water ripples under the cursor, and a soft water
 * line where the pool ends. Home uses PoolHero instead.
 */
export default function Hero({
  image,
  imageAlt,
  imageFilter,
  navVariant = "transparent",
  eyebrow,
  title,
  sticker,
  children,
  next = "var(--foam)",
}) {
  const filter = imageFilter ? { filter: imageFilter } : undefined;
  return (
    <div className="hero bg-pool">
      <Nav variant={navVariant} />
      <div className="hero-inner container">
        <div className="hero-content">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <SplitText as="h1" className="hero-title" split="hero">
            {title}
          </SplitText>
          {children}
        </div>
        <figure className="hero-photo">
          <img className="hero-img" src={image} alt={imageAlt} style={filter} />
          <ShaderCanvas variant="water" image={image} style={filter} />
          {sticker && <span className="hero-sticker">{sticker}</span>}
        </figure>
      </div>
      <WaterEdge top="transparent" bottom={next} />
    </div>
  );
}
