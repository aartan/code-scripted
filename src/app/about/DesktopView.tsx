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

    // Navigation dot sections
    const sections = [
        { id: "intro", label: "CodeScripted" },
        { id: "author", label: "Author" },
        { id: "footer", label: "Footer" }
    ];

    // Use our custom hook for fullpage scrolling
    const {
        activeSection,
        isTransitioning,
        containerRef,
        scrollToSection
    } = useFullPageScroll("intro", {
        intro: introRef,
        author: authorRef,
        footer: footerRef
    });

    // Update the previous section when active section changes
    useEffect(() => {
        if (!isTransitioning) {
            setPreviousSection(activeSection);
        }
    }, [activeSection, isTransitioning]);

    // Custom scroll handler to track direction
    const handleScrollToSection = (section: string) => {
        setPreviousSection(activeSection);
        scrollToSection(section);
    };

    // Handle initial page load with hash
    useEffect(() => {
        const hash = window.location.hash;

        if (hash === "#author") {
            scrollToSection("author");
            setPreviousSection("intro"); // Initial direction assumption
        } else if (hash === "#footer") {
            scrollToSection("footer");
            setPreviousSection("author"); // Initial direction assumption
        }
    }, []);

    // Prevent default touchmove to avoid unintended navigation
    useEffect(() => {
        const preventDefaultTouch = (e: TouchEvent) => {
            // Still let the hook handle the touch
            if (e.target && (e.target as HTMLElement).tagName === 'BUTTON') {
                // Allow buttons to receive touch events normally
                return;
            }
            // Prevent default for non-button elements
            e.preventDefault();
        };

        document.addEventListener('touchmove', preventDefaultTouch, { passive: false });

        return () => {
            document.removeEventListener('touchmove', preventDefaultTouch);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen w-full overflow-hidden relative"
            style={{ touchAction: 'none' }}
        >
            {/* Side navigation dots */}
            <NavigationDots
                sections={sections}
                activeSection={activeSection}
                onSectionChange={handleScrollToSection}
                isTransitioning={isTransitioning}
            />

            {/* Sections Container with transition effect */}
            <div className="relative h-full">
                {/* Introduction Section */}
                <IntroSection
                    sectionRef={introRef}
                    isMobile={false}
                    isActive={activeSection === "intro"}
                    onReadMore={() => handleScrollToSection("author")}
                    isTransitioning={isTransitioning}
                />

                {/* Author Section */}
                <AuthorSection
                    sectionRef={authorRef}
                    isMobile={false}
                    isActive={activeSection === "author"}
                    onBackToTop={() => handleScrollToSection("intro")}
                    onGoToFooter={() => handleScrollToSection("footer")}
                    isTransitioning={isTransitioning}
                    previousSection={previousSection}
                />

                {/* Footer Section */}
                <FooterSection
                    sectionRef={footerRef}
                    isMobile={false}
                    isActive={activeSection === "footer"}
                    onBackToTop={() => handleScrollToSection("author")}
                    isTransitioning={isTransitioning}
                />
            </div>
        </div>
    );
}