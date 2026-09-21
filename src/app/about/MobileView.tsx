// MobileView.tsx
import { useRef, useEffect } from "react";
import IntroSection from "./IntroSection";
import AuthorSection from "./AuthorSection";

export default function MobileView() {
  // Refs for each section
  const introRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  // Handle initial page load with hash for mobile
  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#author") {
      // On mobile, just scroll to the section
      setTimeout(() => {
        authorRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Introduction Section */}
      <IntroSection sectionRef={introRef} isMobile={true} />

      {/* Author Section */}
      <AuthorSection sectionRef={authorRef} isMobile={true} />

      {/* The footer is now accessible on mobile */}
    </div>
  );
}
