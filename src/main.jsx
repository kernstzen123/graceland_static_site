import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { initSmoothScroll } from "./lib/motion";

// Start Lenis before the first render so the intro can lock scrolling.
initSmoothScroll();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
