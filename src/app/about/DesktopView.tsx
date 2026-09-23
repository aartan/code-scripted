import { useRef, useEffect, useState } from "react";
import IntroSection from "./IntroSection";
import AuthorSection from "./AuthorSection";
import FooterSection from "./FooterSection";
import NavigationDots from "./NavigationDots";
import useFullPageScroll from "./hooks/useFullPageScroll";

export default function DesktopView() {
  // Refs for each section
  const introRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Track the previous section for directional animations
  const [previousSection, setPreviousSection] = useState<string>("intro");

  const [isLoading, setIsLoading] = useState(true);
  const [visitedSections, setVisitedSections] = useState<{
    [key: string]: boolean;
  }>({
    intro: true,
    author: false,
    footer: false,
  });

  // Navigation dot sections
  const sections = [
    { id: "intro", label: "CodeScripted" },
    { id: "author", label: "Author" },
    { id: "footer", label: "Lets Connect" },
  ];

  // Use our custom hook for fullpage scrolling
  const { activeSection, isTransitioning, containerRef, scrollToSection } =
      useFullPageScroll("intro", {
        intro: introRef,
        author: authorRef,
        footer: footerRef,
      });

  // Load visited sections from localStorage after component mounts (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("visitedSections");
      if (stored) {
        setVisitedSections(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      // Set loading to false regardless of whether localStorage was successfully accessed
      setIsLoading(false);
    }
  }, []);

  // Update the previous section when active section changes
  useEffect(() => {
    if (!isTransitioning) {
      setPreviousSection(activeSection);

      // Mark the current section as visited
      setVisitedSections((prev) => {
        const updated = {
          ...prev,
          [activeSection]: true,
        };

        // Save to localStorage
        try {
          localStorage.setItem("visitedSections", JSON.stringify(updated));
        } catch (error) {
          console.error("Error writing to localStorage:", error);
        }

        return updated;
      });
    }
  }, [activeSection, isTransitioning]);

  // Custom scroll handler to track direction
  const handleScrollToSection = (section: string) => {
    setPreviousSection(activeSection);
    scrollToSection(section);
  };

  // Navigation handler for links in the footer
  const handleNavigation = (section: string) => {
    if (sections.find((s) => s.id === section)) {
      handleScrollToSection(section);
    }
  };

  // Handle initial page load with hash
  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#author") {
      scrollToSection("author");
      setPreviousSection("intro"); // Initial direction assumption
      setVisitedSections((prev) => {
        const updated = {
          ...prev,
          author: true,
        };

        try {
          localStorage.setItem("visitedSections", JSON.stringify(updated));
        } catch (error) {
          console.error("Error writing to localStorage:", error);
        }

        return updated;
      });
    } else if (hash === "#footer") {
      scrollToSection("footer");
      setPreviousSection("author"); // Initial direction assumption
      setVisitedSections((prev) => {
        const updated = {
          ...prev,
          author: true,
          footer: true,
        };

        try {
          localStorage.setItem("visitedSections", JSON.stringify(updated));
        } catch (error) {
          console.error("Error writing to localStorage:", error);
        }

        return updated;
      });
    }
  }, []);

  return (
      <div
          ref={containerRef}
          className="h-screen w-full overflow-hidden relative"
          style={{ touchAction: "none" }}
      >
        {/* Side navigation dots */}
        <NavigationDots
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleScrollToSection}
            isTransitioning={isTransitioning}
        />

        {/* Sections Container with transition effect */}
        <div className="relative h-full w-full">
          {/* Introduction Section */}
          <IntroSection
              sectionRef={introRef}
              isMobile={false}
              isActive={activeSection === "intro"}
              onReadMore={
                !isLoading && !visitedSections.author
                    ? () => handleScrollToSection("author")
                    : undefined
              }
              isTransitioning={isTransitioning}
          />

          {/* Author Section */}
          <AuthorSection
              sectionRef={authorRef}
              isMobile={false}
              isActive={activeSection === "author"}
              onGoToFooter={
                !isLoading && !visitedSections.footer
                    ? () => handleScrollToSection("footer")
                    : undefined
              }
              isTransitioning={isTransitioning}
              previousSection={previousSection}
          />

          {/* Footer Section - pass the navigation handler */}
          <FooterSection
              sectionRef={footerRef}
              isMobile={false}
              isActive={activeSection === "footer"}
              isTransitioning={isTransitioning}
              onNavigate={handleNavigation}
          />
        </div>
      </div>
  );
}