// hooks/useFullPageScroll.tsx
import { useState, useEffect, useRef, RefObject, SetStateAction } from "react";

interface SectionRefs {
  [key: string]: RefObject<HTMLDivElement>;
}

export default function useFullPageScroll(
  initialSection: string,
  sectionRefs: SectionRefs,
) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const containerRef = useRef<HTMLDivElement>(null);

  // Add a ref to track the last scroll timestamp to prevent multiple scrolls
  const lastScrollTime = useRef<number>(0);
  // Minimum time between scroll actions in milliseconds
  const scrollCooldown = 1500; // Increased from 1200ms to 1500ms
  // Track the previous active section to determine scroll direction
  const previousSectionRef = useRef<string>(initialSection);

  // Track accumulated scroll for wheel events
  const scrollAccumulator = useRef<number>(0);
  // Threshold that must be reached before triggering a section change (higher = more effort)
  const scrollThreshold = 150; // Adjust this value to control scroll sensitivity

  // Handle initial page load with hash
  useEffect(() => {
    const hash = window.location.hash;
    const sectionId = hash.substring(1);

    if (sectionId && sectionRefs[sectionId]?.current) {
      setActiveSection(sectionId);
      window.scrollTo(0, 0);
    }

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [sectionRefs]);

  // Reset accumulator when changing sections
  useEffect(() => {
    scrollAccumulator.current = 0;
  }, [activeSection]);

  // Handle wheel events globally instead of just on the container
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();

      // If we're transitioning or if it's too soon since the last scroll, ignore this scroll event
      const now = Date.now();
      if (isTransitioning || now - lastScrollTime.current < scrollCooldown) {
        return;
      }

      // Accumulate scroll delta
      scrollAccumulator.current += Math.abs(e.deltaY);

      // Only trigger scroll if accumulated value exceeds threshold
      if (scrollAccumulator.current < scrollThreshold) {
        return;
      }

      // Reset accumulator
      scrollAccumulator.current = 0;

      const delta = e.deltaY;
      const sections = Object.keys(sectionRefs);
      const currentIndex = sections.indexOf(activeSection);

      // Only scroll one section at a time
      if (delta > 0 && currentIndex < sections.length - 1) {
        // Scroll down to next section
        lastScrollTime.current = now;
        setScrollDirection("down");
        scrollToSection(sections[currentIndex + 1]);
      } else if (delta < 0 && currentIndex > 0) {
        // Scroll up to previous section
        lastScrollTime.current = now;
        setScrollDirection("up");
        scrollToSection(sections[currentIndex - 1]);
      }
    };

    const preventDefaultScroll = (e: Event) => {
      e.preventDefault();
    };

    // Attach to window instead of container to capture all scroll events
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("scroll", preventDefaultScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("scroll", preventDefaultScroll);
    };
  }, [activeSection, isTransitioning, sectionRefs]);

  // Handle touch events globally for mobile swipe
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // If transitioning or if it's too soon since the last scroll, ignore this touch event
      const now = Date.now();
      if (isTransitioning || now - lastScrollTime.current < scrollCooldown) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Minimum swipe distance to trigger section change (px)
      // Increased from 50px to 100px to require more deliberate swipes
      const minSwipeDistance = 100;

      if (Math.abs(deltaY) < minSwipeDistance) {
        return; // Ignore small swipes
      }

      const sections = Object.keys(sectionRefs);
      const currentIndex = sections.indexOf(activeSection);

      if (deltaY > 0 && currentIndex < sections.length - 1) {
        // Swipe up - go to next section
        lastScrollTime.current = now;
        setScrollDirection("down");
        scrollToSection(sections[currentIndex + 1]);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down - go to previous section
        lastScrollTime.current = now;
        setScrollDirection("up");
        scrollToSection(sections[currentIndex - 1]);
      }
    };

    // Attach touch events to window instead of just the container
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, isTransitioning, sectionRefs]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If transitioning or if it's too soon since the last action, ignore this key event
      const now = Date.now();
      if (isTransitioning || now - lastScrollTime.current < scrollCooldown) {
        return;
      }

      const sections = Object.keys(sectionRefs);
      const currentIndex = sections.indexOf(activeSection);

      if (
        (e.key === "ArrowDown" || e.key === "PageDown") &&
        currentIndex < sections.length - 1
      ) {
        lastScrollTime.current = now;
        setScrollDirection("down");
        scrollToSection(sections[currentIndex + 1]);
        e.preventDefault();
      } else if (
        (e.key === "ArrowUp" || e.key === "PageUp") &&
        currentIndex > 0
      ) {
        lastScrollTime.current = now;
        setScrollDirection("up");
        scrollToSection(sections[currentIndex - 1]);
        e.preventDefault();
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

    // Determine scroll direction based on section indices
    const sections = Object.keys(sectionRefs);
    const currentIndex = sections.indexOf(activeSection as string);
    const newIndex = sections.indexOf(section as string);

    if (newIndex > currentIndex) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    // Store previous section before changing
    previousSectionRef.current = activeSection;

    setIsTransitioning(true);
    setScrolling(true);
    setActiveSection(section);

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    window.scrollTo(0, 0);
    window.history.pushState(null, "", `#${section}`);

    // Ensure transition is complete before allowing another section change
    setTimeout(() => {
      setScrolling(false);
      setIsTransitioning(false);
    }, 1000); // Match this with your CSS transition duration
  };

  return {
    activeSection,
    isTransitioning,
    scrolling,
    scrollDirection,
    containerRef,
    scrollToSection,
    previousSection: previousSectionRef.current,
  };
}
