"use client";

import Image from "next/image";
import { useState, useEffect, useRef, SetStateAction } from "react";

export default function AboutPageContent() {
    // State for tracking active section and scroll behavior
    const [activeSection, setActiveSection] = useState("intro");
    const [scrolling, setScrolling] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Refs for each section
    const introRef = useRef<HTMLDivElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Handle initial page load with hash
    useEffect(() => {
        const hash = window.location.hash;

        if (hash === "#author") {
            if (isMobile) {
                // On mobile, just scroll to the section
                setTimeout(() => {
                    authorRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                // On desktop, use the section navigation
                setActiveSection("author");
                window.scrollTo(0, 0);
            }
        }

        // Only prevent scrolling on desktop
        if (!isMobile) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

        return () => {
            // Restore scrolling when component unmounts
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isMobile]);

    // Desktop only: Prevent default scroll behavior and handle wheel events
    useEffect(() => {
        if (isMobile) return; // Skip this effect on mobile

        const preventScroll = (e: WheelEvent) => {
            e.preventDefault();

            if (isTransitioning) return;

            const delta = e.deltaY;

            if (delta > 0 && activeSection === "intro") {
                scrollToSection("author");
            } else if (delta < 0 && activeSection === "author") {
                scrollToSection("intro");
            }
        };

        const preventDefaultScroll = (e: Event) => {
            e.preventDefault();
        };

        const container = containerRef.current;
        if (container && !isMobile) {
            container.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener('scroll', preventDefaultScroll, { passive: false });
            window.addEventListener('touchmove', preventDefaultScroll, { passive: false });
        }

        return () => {
            if (container && !isMobile) {
                container.removeEventListener("wheel", preventScroll);
                window.removeEventListener('scroll', preventDefaultScroll);
                window.removeEventListener('touchmove', preventDefaultScroll);
            }
        };
    }, [activeSection, isTransitioning, isMobile]);

    // Desktop only: Handle keyboard navigation
    useEffect(() => {
        if (isMobile) return; // Skip this effect on mobile

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTransitioning) return;

            if ((e.key === "ArrowDown" || e.key === "PageDown") && activeSection === "intro") {
                scrollToSection("author");
            } else if ((e.key === "ArrowUp" || e.key === "PageUp") && activeSection === "author") {
                scrollToSection("intro");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeSection, isTransitioning, isMobile]);

    // Function to handle smooth scrolling between sections (desktop only)
    const scrollToSection = (section: SetStateAction<string>) => {
        if (isTransitioning || section === activeSection) return;

        if (isMobile) {
            // On mobile, just scroll to the section
            const targetRef = section === "author" ? authorRef.current : introRef.current;
            targetRef?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Desktop behavior
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

    // Navigation dot sections
    const sections = [
        { id: "intro", label: "CodeScripted" },
        { id: "author", label: "Author" }
    ];

    // Render mobile version with normal scrolling
    if (isMobile) {
        return (
            <div className="min-h-screen">
                {/* Introduction Section */}
                <section
                    ref={introRef}
                    id="intro"
                    className="min-h-[75vh] flex items-center justify-center mb-12"
                >
                    <div className="w-full max-w-4xl mx-auto px-4">
                        <div className="flex flex-col gap-8 items-center my-12">
                            <div className="w-full relative h-64 rounded-xl overflow-hidden shadow-2xl mb-6">
                                <Image
                                    src="/assets/blog/codescripted.webp"
                                    alt="Programming Code"
                                    fill
                                    sizes="100vw"
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-base sm:text-lg leading-relaxed mb-4">
                                    This blog is dedicated to exploring the latest
                                    trends, tools, and techniques in software development and technology.
                                    Whether you're a seasoned developer or just starting out, you'll find valuable
                                    insights and tutorials that will help you level up your coding skills.
                                </p>

                                <p className="text-base sm:text-lg leading-relaxed mb-4">
                                    Here at CodeScripted, we believe in the power of code to solve real-world
                                    problems and create amazing applications. My mission is to provide high-
                                    quality, practical content that developers can use in their day-to-day work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Author Section */}
                <section
                    ref={authorRef}
                    id="author"
                    className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 mb-16"
                >
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col gap-8 items-center w-full my-3">
                                <div className="w-32 h-32 relative rounded-full overflow-hidden
                                    border-2 border-gray-200 dark:border-gray-600 shadow-lg mb-6">
                                    <Image
                                        src="/assets/blog/authors/me.png"
                                        alt="Abdifatah"
                                        fill
                                        sizes="8rem"
                                        priority
                                        className="object-cover"
                                    />
                                </div>

                                <div className="w-full">
                                    <p className="text-base sm:text-lg leading-relaxed mb-4">
                                        My name is Abdifatah, and I'm a software engineer who enjoys solving
                                        problems using code and building things that make a difference. Throughout
                                        my career, I've had the privilege of working with some outstanding teams
                                        and these experiences have allowed me to sharpen my expertise in web
                                        development.
                                    </p>

                                    <p className="text-base sm:text-lg leading-relaxed mb-4">
                                        I've spent a lot of time in the trenches, tackling complex problems and
                                        crafting solutions that make a real difference. Through CodeScripted, I'm
                                        excited to share what I've learned, offer insights, and dive deep into the
                                        technologies and practices that drive our industry forward.
                                    </p>

                                    <p className="text-base sm:text-lg leading-relaxed mb-4">
                                        Thank you for visiting, and I hope you find the content both informative and
                                        inspiring. Feel free to reach out if you have any questions, suggestions, or
                                        just want to connect!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The footer is now accessible on mobile */}
            </div>
        );
    }

    // Desktop version with fullscreen sections
    return (
        <div
            ref={containerRef}
            className="h-screen overflow-hidden relative"
            style={{ touchAction: 'none' }}
        >
            {/* Side navigation dots - desktop only */}
            <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
                <div className="py-3 px-2 bg-black/20 backdrop-blur-sm rounded-full">
                    <div className="flex flex-col space-y-5">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="group relative"
                                aria-label={`Navigate to ${section.label}`}
                                disabled={isTransitioning}
                            >
                                {/* Tooltip */}
                                <span className="absolute right-7 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                   whitespace-nowrap bg-black/70 text-white text-xs py-1 px-2 rounded pointer-events-none">
                                    {section.label}
                                </span>

                                {/* Dot */}
                                <div
                                    className={`w-3 h-3 rounded-full transition-all duration-300 
                                    ${activeSection === section.id
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/80"
                                    }`}
                                ></div>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Sections Container with transition effect */}
            <div className="relative h-full">
                {/* Introduction Section */}
                <section
                    ref={introRef}
                    className={`absolute w-full h-full flex items-center justify-center transition-all duration-1000 ease-in-out
                        ${activeSection === "intro" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
                >
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:my-24">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                {/* Image only displays on larger screens */}
                                <div className="w-full md:w-2/5 relative h-64 rounded-xl overflow-hidden shadow-2xl md:mr-8 mb-6 md:mb-0">
                                    <Image
                                        src="/assets/blog/codescripted.webp"
                                        alt="Programming Code"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full md:w-3/5">
                                    <p className="text-base sm:text-lg leading-relaxed mb-4">
                                        This blog is dedicated to exploring the latest
                                        trends, tools, and techniques in software development and technology.
                                        Whether you're a seasoned developer or just starting out, you'll find valuable
                                        insights and tutorials that will help you level up your coding skills.
                                    </p>

                                    <p className="text-base sm:text-lg leading-relaxed mb-4">
                                        Here at CodeScripted, we believe in the power of code to solve real-world
                                        problems and create amazing applications. My mission is to provide high-
                                        quality, practical content that developers can use in their day-to-day work.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => scrollToSection("author")}
                                className="group flex items-center gap-2 text-base sm:text-lg leading-relaxed mb-4"
                                disabled={isTransitioning}
                                style={{
                                    transition: "all 0.3s ease",
                                    color: "var(--text-color, #333333)", /* Dynamic color based on theme */
                                }}
                                onMouseEnter={(e) => {
                                    // Detect if we're in dark mode or light mode by checking the background color
                                    const isDarkMode = window.getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                                    const brightness = isDarkMode ?
                                        (parseInt(isDarkMode[1]) * 0.299 + parseInt(isDarkMode[2]) * 0.587 + parseInt(isDarkMode[3]) * 0.114) : 255;

                                    // Set appropriate hover color based on detected theme
                                    if (brightness < 128) {
                                        // Dark mode
                                        e.currentTarget.style.color = "#ffffff";
                                    } else {
                                        // Light mode - more noticeable change but still black and white
                                        e.currentTarget.style.color = "#000000";
                                        e.currentTarget.style.fontWeight = "600"; // More bold for visibility
                                        e.currentTarget.style.transform = "translateX(2px)"; // Slight horizontal shift in light mode
                                    }

                                    // Add null check for SVG element
                                    const svgElement = e.currentTarget.querySelector("svg");
                                    if (svgElement) {
                                        svgElement.style.transform = "translateY(3px)";
                                        svgElement.style.opacity = "1";
                                        svgElement.classList.remove("animate-bounce");
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    // Return to the default color for the current theme
                                    const isDarkMode = window.getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                                    const brightness = isDarkMode ?
                                        (parseInt(isDarkMode[1]) * 0.299 + parseInt(isDarkMode[2]) * 0.587 + parseInt(isDarkMode[3]) * 0.114) : 255;

                                    if (brightness < 128) {
                                        // Dark mode
                                        e.currentTarget.style.color = "#a0a6b5";
                                    } else {
                                        // Light mode
                                        e.currentTarget.style.color = "#555555"; // Slightly darker than before for better contrast
                                        e.currentTarget.style.fontWeight = "normal";
                                        e.currentTarget.style.transform = "translateX(0)";
                                    }

                                    // Add null check for SVG element
                                    const svgElement = e.currentTarget.querySelector("svg");
                                    if (svgElement) {
                                        svgElement.style.transform = "translateY(0)";
                                        svgElement.style.opacity = "0.8";
                                        svgElement.classList.add("animate-bounce");
                                    }
                                }}
                            >
                                Read More
                                <svg
                                    className="w-4 h-4 animate-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        transition: "all 0.3s ease",
                                        opacity: "0.8",
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Author Section */}
                <section
                    ref={authorRef}
                    className={`absolute w-full h-full flex items-center justify-center px-4 sm:px-6 transition-all duration-1000 ease-in-out
                        ${activeSection === "author" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
                >
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col md:flex-row gap-8 items-center w-full my-3 md:mb-24">
                                {/* Image Container */}
                                <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden
                                    border-2 border-gray-200 dark:border-gray-600 shadow-lg
                                    flex-shrink-0 md:mr-8 mb-6 md:mb-0">
                                    <Image
                                        src="/assets/blog/authors/me.png"
                                        alt="Abdifatah"
                                        fill
                                        sizes="(max-width: 768px) 8rem, 12rem"
                                        priority
                                        className="object-cover"
                                    />
                                </div>

                                {/* Text content */}
                                <div className="flex-grow">
                                    <div className="w-full">
                                        <p className="text-base sm:text-lg leading-relaxed mb-4">
                                            My name is Abdifatah, and I'm a software engineer who enjoys solving
                                            problems using code and building things that make a difference. Throughout
                                            my career, I've had the privilege of working with some outstanding teams
                                            and these experiences have allowed me to sharpen my expertise in web
                                            development.
                                        </p>

                                        <p className="text-base sm:text-lg leading-relaxed mb-4">
                                            I've spent a lot of time in the trenches, tackling complex problems and
                                            crafting solutions that make a real difference. Through CodeScripted, I'm
                                            excited to share what I've learned, offer insights, and dive deep into the
                                            technologies and practices that drive our industry forward.
                                        </p>

                                        <p className="text-base sm:text-lg leading-relaxed mb-4">
                                            Thank you for visiting, and I hope you find the content both informative and
                                            inspiring. Feel free to reach out if you have any questions, suggestions, or
                                            just want to connect!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation button */}
                            <div className="flex justify-center gap-4 text-base sm:text-lg leading-relaxed mb-4">
                                <button
                                    onClick={() => scrollToSection("intro")}
                                    className="group flex items-center justify-center gap-2 px-5 py-2 transition-all"
                                    aria-label="Back to top of page"
                                    disabled={isTransitioning}
                                    style={{
                                        transition: "all 0.3s ease",
                                        color: "var(--text-color, #333333)", /* Dynamic color based on theme */
                                    }}
                                    onMouseEnter={(e) => {
                                        // Detect if we're in dark mode or light mode by checking the background color
                                        const isDarkMode = window.getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                                        const brightness = isDarkMode ?
                                            (parseInt(isDarkMode[1]) * 0.299 + parseInt(isDarkMode[2]) * 0.587 + parseInt(isDarkMode[3]) * 0.114) : 255;

                                        // Set appropriate hover color based on detected theme
                                        if (brightness < 128) {
                                            // Dark mode
                                            e.currentTarget.style.color = "#ffffff";
                                        } else {
                                            // Light mode - more noticeable change but still black and white
                                            e.currentTarget.style.color = "#000000";
                                            e.currentTarget.style.fontWeight = "600"; // More bold for visibility
                                            e.currentTarget.style.transform = "translateY(-2px)"; // Slight upward shift in light mode (for "back to top")
                                        }

                                        // Add null check for SVG element
                                        const svgElement = e.currentTarget.querySelector("svg");
                                        if (svgElement) {
                                            svgElement.style.transform = "translateY(-3px)"; // Move arrow up for "back to top"
                                            svgElement.style.opacity = "1";
                                            svgElement.classList.remove("animate-bounce");
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        // Return to the default color for the current theme
                                        const isDarkMode = window.getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                                        const brightness = isDarkMode ?
                                            (parseInt(isDarkMode[1]) * 0.299 + parseInt(isDarkMode[2]) * 0.587 + parseInt(isDarkMode[3]) * 0.114) : 255;

                                        if (brightness < 128) {
                                            // Dark mode
                                            e.currentTarget.style.color = "#a0a6b5";
                                        } else {
                                            // Light mode
                                            e.currentTarget.style.color = "#555555"; // Slightly darker than before for better contrast
                                            e.currentTarget.style.fontWeight = "normal";
                                            e.currentTarget.style.transform = "translateY(0)";
                                        }

                                        // Add null check for SVG element
                                        const svgElement = e.currentTarget.querySelector("svg");
                                        if (svgElement) {
                                            svgElement.style.transform = "translateY(0)";
                                            svgElement.style.opacity = "0.8";
                                            svgElement.classList.add("animate-bounce");
                                        }
                                    }}
                                >
                                    <svg
                                        className="w-4 h-4 animate-bounce"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            transition: "all 0.3s ease",
                                            opacity: "0.8",
                                        }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7-7m0 0l-7 7m7-7v18"
                                        />
                                    </svg>
                                    Back To Top
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}