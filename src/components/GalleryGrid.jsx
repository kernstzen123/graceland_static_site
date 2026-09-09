import "./GalleryGrid.css";

export default function GalleryGrid({ images }) {
  return (
    <div className="gallery-grid">
      {images.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
      ))}
    </div>
  );
}
