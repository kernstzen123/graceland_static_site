import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WaveDivider from "../components/WaveDivider";
import BookNowButton from "../components/BookNowButton";
import "./Gallery.css";

const ALL_PHOTOS = [
  { src: "/assets/bath-pool.jpg", alt: "Bath pool" },
  { src: "/assets/beach-rock-pool.jpg", alt: "Beach rock pool" },
  { src: "/assets/boma-1.jpg", alt: "Boma 1" },
  { src: "/assets/boma-2.jpg", alt: "Boma 2" },
  { src: "/assets/gardens.jpg", alt: "Gardens" },
  { src: "/assets/park.jpg", alt: "Park" },
  { src: "/assets/toddler-boat.jpg", alt: "Toddler boat" },
  { src: "/assets/venue-1.jpg", alt: "Venue 1" },
  { src: "/assets/venue-2.jpg", alt: "Venue 2" },
  { src: "/assets/venue-3.jpg", alt: "Venue 3" },
  { src: "/assets/waterslide.jpg", alt: "Waterslide" },
  { src: "/assets/wedding.jpg", alt: "Wedding" },
];

export default function Gallery() {
  return (
    <main id="main" className="gallery-page">
      <Nav variant="teal" />

      <div className="gallery-title-block container">
        <span className="eyebrow">— THE PLACE, UNFILTERED</span>
        <h1 className="headline gallery-page-title">ALL PHOTOS</h1>
      </div>

      <div className="gallery-page-grid container">
        {ALL_PHOTOS.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
        ))}
      </div>

      <WaveDivider amplitude="high" fill="#e9601f" bg="#fbf3e2" />
      <div className="gallery-closing">
        <h2 className="headline gallery-closing-title">SEE IT YOURSELF</h2>
        <div className="gallery-closing-btn">
          <BookNowButton size="hero" />
        </div>
      </div>

      <Footer variant="simple" />
    </main>
  );
}
