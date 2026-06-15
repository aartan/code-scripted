// DesktopView.tsx
import { useRef, useEffect } from "react";
import IntroSection from "./IntroSection";
import AuthorSection from "./AuthorSection";
import NavigationDots from "./NavigationDots";
import useFullPageScroll from "./hooks/useFullPageScroll";

export default function DesktopView() {
    // Refs for each section
    const introRef = useRef<HTMLDivElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);

    // Navigation dot sections
    const sections = [
        { id: "intro", label: "CodeScripted" },
        { id: "author", label: "Author" }
    ];

    // Use our custom hook for fullpage scrolling
    const {
        activeSection,
        isTransitioning,
        scrolling,
        containerRef,
        scrollToSection
    } = useFullPageScroll("intro", {
        intro: introRef,
        author: authorRef
    });

    // Handle initial page load with hash
    useEffect(() => {
        const hash = window.location.hash;

        if (hash === "#author") {
            scrollToSection("author");
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen overflow-hidden relative"
            style={{ touchAction: 'none' }}
        >
            {/* Side navigation dots */}
            <NavigationDots
                sections={sections}
                activeSection={activeSection}
                onSectionChange={scrollToSection}
                isTransitioning={isTransitioning}
            />

            {/* Sections Container with transition effect */}
            <div className="relative h-full">
                {/* Introduction Section */}
                <IntroSection
                    sectionRef={introRef}
                    isMobile={false}
                    isActive={activeSection === "intro"}
                    onReadMore={() => scrollToSection("author")}
                    isTransitioning={isTransitioning}
                />

                {/* Author Section */}
                <AuthorSection
                    sectionRef={authorRef}
                    isMobile={false}
                    isActive={activeSection === "author"}
                    onBackToTop={() => scrollToSection("intro")}
                    isTransitioning={isTransitioning}
                />
            </div>
        </div>
    );
}