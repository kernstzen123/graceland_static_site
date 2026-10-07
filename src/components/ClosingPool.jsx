import PoolSurface from "./PoolSurface";
import SplitText from "./SplitText";
import BookNowButton from "./BookNowButton";
import "./ClosingPool.css";

/** Every page ends back in the pool: a splashable sign-off with Book Now. */
export default function ClosingPool({ title, sub, children }) {
  return (
    <section className="closing-pool" data-bubbles>
      <PoolSurface floatSelector=".closing-pool-title .split-char" lane={-1} />
      <div className="closing-pool-inner container">
        <SplitText as="h2" className="closing-pool-title">
          {title}
        </SplitText>
        {sub && <p className="closing-pool-sub">{sub}</p>}
        <div className="closing-pool-actions">{children || <BookNowButton size="hero" />}</div>
      </div>
    </section>
  );
}
