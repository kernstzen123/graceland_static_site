import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import StickyBookNow from "./components/StickyBookNow";
import MotionLayer from "./components/MotionLayer";
import Preloader from "./components/Preloader";
import RouteTransition from "./components/RouteTransition";
import PageMotion from "./components/PageMotion";
import { scrollTo, ScrollTrigger } from "./lib/motion";
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
        scrollTo(el, { offset: -100 });
        return;
      }
    }
    scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  // Keyed by path so each page mounts fresh and gets its own animation context.
  return (
    <PageMotion key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/water-park" element={<WaterPark />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/weddings" element={<Weddings />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </PageMotion>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Preloader />
      <ScrollToTop />
      <AnimatedRoutes />
      <StickyBookNow />
      <RouteTransition />
      <MotionLayer />
    </BrowserRouter>
  );
}
