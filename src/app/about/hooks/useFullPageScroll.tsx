// hooks/useFullPageScroll.tsx
import { useState, useEffect, useRef, RefObject, SetStateAction } from "react";

interface SectionRefs {
    [key: string]: RefObject<HTMLDivElement>;
}

export default function useFullPageScroll(initialSection: string, sectionRefs: SectionRefs) {
    const [activeSection, setActiveSection] = useState(initialSection);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle initial page load with hash
    useEffect(() => {
        const hash = window.location.hash;
        const sectionId = hash.substring(1);

        if (sectionId && sectionRefs[sectionId]?.current) {
            setActiveSection(sectionId);
            window.scrollTo(0, 0);
        }

        // Prevent scrolling on desktop
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            // Restore scrolling when component unmounts
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [sectionRefs]);

    // Prevent default scroll behavior and handle wheel events
    useEffect(() => {
        const preventScroll = (e: WheelEvent) => {
            e.preventDefault();

            if (isTransitioning) return;

            const delta = e.deltaY;
            const sections = Object.keys(sectionRefs);
            const currentIndex = sections.indexOf(activeSection);

            if (delta > 0 && currentIndex < sections.length - 1) {
                // Scroll down to next section
                scrollToSection(sections[currentIndex + 1]);
            } else if (delta < 0 && currentIndex > 0) {
                // Scroll up to previous section
                scrollToSection(sections[currentIndex - 1]);
            }
        };

        const preventDefaultScroll = (e: Event) => {
            e.preventDefault();
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener('scroll', preventDefaultScroll, { passive: false });
            window.addEventListener('touchmove', preventDefaultScroll, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", preventScroll);
                window.removeEventListener('scroll', preventDefaultScroll);
                window.removeEventListener('touchmove', preventDefaultScroll);
            }
        };
    }, [activeSection, isTransitioning, sectionRefs]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTransitioning) return;

            const sections = Object.keys(sectionRefs);
            const currentIndex = sections.indexOf(activeSection);

            if ((e.key === "ArrowDown" || e.key === "PageDown") && currentIndex < sections.length - 1) {
                scrollToSection(sections[currentIndex + 1]);
            } else if ((e.key === "ArrowUp" || e.key === "PageUp") && currentIndex > 0) {
                scrollToSection(sections[currentIndex - 1]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeSection, isTransitioning, sectionRefs]);

    // Function to handle smooth scrolling between sections
    const scrollToSection = (section: SetStateAction<string>) => {
        if (isTransitioning || section === activeSection) return;

        setIsTransitioning(true);
        setScrolling(true);
        setActiveSection(section);

        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }

        window.scrollTo(0, 0);
        window.history.pushState(null, "", `#${section}`);

        setTimeout(() => {
            setScrolling(false);
            setIsTransitioning(false);
            window.scrollTo(0, 0);
        }, 1000);
    };

    return {
        activeSection,
        isTransitioning,
        scrolling,
        containerRef,
        scrollToSection
    };
}