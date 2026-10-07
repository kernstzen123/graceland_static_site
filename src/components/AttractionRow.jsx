import "./AttractionRow.css";

const TONE = { teal: "pool", yellow: "lemon", tangerine: "lilo", tan: "white" };

/** One attraction: a colour card with the photo set into it like a porthole. */
export default function AttractionRow({ title, body, image, alt, bg, imageFirst }) {
  return (
    <article className={`attraction-row attraction-row--${TONE[bg] || bg}` + (imageFirst ? " attraction-row--image-first" : "")}>
      <div className="attraction-copy">
        <h3 className="attraction-title">{title}</h3>
        <p className="attraction-body">{body}</p>
      </div>
      <div className="attraction-media">
        <img src={image} alt={alt} loading="lazy" />
      </div>
    </article>
  );
}
