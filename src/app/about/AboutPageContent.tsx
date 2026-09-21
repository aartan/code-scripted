"use client";

import { useState, useEffect } from "react";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

export default function AboutPageContent() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Render mobile or desktop view based on screen size
  return isMobile ? <MobileView /> : <DesktopView />;
}
