import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Add meta viewport if not already present
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content =
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
  document.head.appendChild(meta);
}

// Add theme class to root element
document.documentElement.classList.add("light");

// Initialize CSS custom properties for safe areas
if (CSS.supports("padding-top: env(safe-area-inset-top)")) {
  document.documentElement.style.setProperty(
    "--safe-area-inset-top",
    "env(safe-area-inset-top)",
  );
  document.documentElement.style.setProperty(
    "--safe-area-inset-right",
    "env(safe-area-inset-right)",
  );
  document.documentElement.style.setProperty(
    "--safe-area-inset-bottom",
    "env(safe-area-inset-bottom)",
  );
  document.documentElement.style.setProperty(
    "--safe-area-inset-left",
    "env(safe-area-inset-left)",
  );
}

// Performance optimizations
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
