import BookNowButton from "./BookNowButton";
import "./StickyBookNow.css";

/** Floating pill, mobile only — present at the bottom of every page. */
export default function StickyBookNow() {
  return (
    <div className="sticky-booknow">
      <BookNowButton size="lg" />
    </div>
  );
}
