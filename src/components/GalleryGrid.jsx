import "./GalleryGrid.css";

/** A loose row of snapshots, each pinned at its own slight angle. */
export default function GalleryGrid({ images }) {
  return (
    <div className="gallery-grid">
      {images.map((img) => (
        <figure className="snap" key={img.src}>
          <img src={img.src} alt={img.alt} loading="lazy" />
          <figcaption>{img.alt}</figcaption>
        </figure>
      ))}
    </div>
  );
}
