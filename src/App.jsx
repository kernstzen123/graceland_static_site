import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import StickyBookNow from "./components/StickyBookNow";
import Home from "./pages/Home";
import WaterPark from "./pages/WaterPark";
import Parties from "./pages/Parties";
import Weddings from "./pages/Weddings";
import Visit from "./pages/Visit";
import Gallery from "./pages/Gallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/water-park" element={<WaterPark />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/weddings" element={<Weddings />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <StickyBookNow />
    </BrowserRouter>
  );
}
