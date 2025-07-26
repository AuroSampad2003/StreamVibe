import { useEffect, useRef, StrictMode } from "react";
import { useLocation, BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

function ScrollRestoration() {
  const { pathname } = useLocation();
  const scrollPositions = useRef({});
  const isFirstLoad = useRef(true);

  // Save scroll position before unload (refresh, close tab)
  useEffect(() => {
    const saveScroll = () => {
      scrollPositions.current[pathname] = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("beforeunload", saveScroll);

    return () => {
      saveScroll();
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [pathname]);

  // Save scroll on route unmount (before pathname changes)
  useEffect(() => {
    return () => {
      scrollPositions.current[pathname] = window.scrollY || window.pageYOffset;
    };
  }, [pathname]);

  // Immediately restore scroll position on route change, no animation or delay
  useEffect(() => {
    if (isFirstLoad.current) {
      window.scrollTo(0, 0);
      isFirstLoad.current = false;
      return;
    }

    const savedPos = scrollPositions.current[pathname];

    if (typeof savedPos === "number" && savedPos > 0) {
      window.scrollTo({ top: savedPos, left: 0, behavior: "auto" });
 // Immediate scroll, no animation
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollRestoration />
      <App />
    </BrowserRouter>
  </StrictMode>
);
