import "./AttractionRow.css";

export default function AttractionRow({ number, title, body, image, alt, bg, imageFirst }) {
  return (
    <div className={"attraction-row" + (imageFirst ? " attraction-row--image-first" : "")}>
      <div className={`attraction-copy attraction-copy--${bg}`}>
        <div className="attraction-number">{number}</div>
        <h3 className="attraction-title">{title.toUpperCase()}</h3>
        <p className="attraction-body">{body}</p>
      </div>
      <div className="attraction-media">
        <img src={image} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
