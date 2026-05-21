"use client";

import Image from "next/image";
import { useState, useEffect, useRef, SetStateAction} from "react";

export default function AboutPageContent() {
    // State for tracking active section and scroll behavior
    const [activeSection, setActiveSection] = useState("intro");
    const [scrolling, setScrolling] = useState(false);

    // Refs for each section
    const introRef = useRef<HTMLDivElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);

    // Handle initial page load with hash
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === "#author") {
            setActiveSection("author");
            setTimeout(() => {
                scrollToSection("author");
            }, 100);
        }
    }, []);

    // Track scroll position and update active section
    useEffect(() => {
        const handleScroll = () => {
            if (scrolling) return;

            const scrollPosition = window.scrollY + window.innerHeight / 3;

            if (authorRef.current && scrollPosition >= authorRef.current.offsetTop) {
                setActiveSection("author");
            } else {
                setActiveSection("intro");
            }
        };

        // Debounce scroll event for performance
        let scrollTimeout: string | number | NodeJS.Timeout | undefined;
        const debouncedHandleScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 20);
        };

        window.addEventListener("scroll", debouncedHandleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [scrolling]);

    // Function to handle smooth scrolling between sections
    const scrollToSection = (section: SetStateAction<string>) => {
        setScrolling(true);
        setActiveSection(section);

        // Use a properly typed variable for the refs
        let targetRef: HTMLDivElement | null = null;
        let offset = 0;

        // Determine the target section and whether we need the offset
        if (section === "author") {
            targetRef = authorRef.current;
        } else {
            targetRef = introRef.current;
        }

        // Check if we're on mobile or desktop
        const isMobile = window.innerWidth < 768; // Adjust based on your mobile breakpoint

        // If not mobile, apply the offset for sections like "intro" or "author"
        if (!isMobile && targetRef) {
            if (section === "intro") {
                offset = 150; // Offset for intro section
            } else if (section === "author") {
                offset = 100; // Reduced offset for author section to center it better
            }

            // Apply scroll with the offset
            window.scrollTo({
                top: targetRef.offsetTop - offset,
                behavior: "smooth",
            });
        } else if (targetRef) {
            // For mobile devices, scroll without offset
            window.scrollTo({
                top: targetRef.offsetTop,
                behavior: "smooth",
            });
        }

        window.history.pushState(null, "", `#${section}`);

        setTimeout(() => {
            setScrolling(false);
        }, 600);
    };

    // Navigation dot sections
    const sections = [
        { id: "intro", label: "CodeScripted" },
        { id: "author", label: "Author" }
    ];

    return (
        <div className="min-h-screen">
            {/* Side navigation dots - desktop only */}
            <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
                <div className="py-3 px-2 bg-black/20 backdrop-blur-sm rounded-full">
                    <div className="flex flex-col space-y-5">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="group relative"
                                aria-label={`Navigate to ${section.label}`}
                            >
                                {/* Tooltip */}
                                <span className="absolute right-7 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               whitespace-nowrap bg-black/70 text-white text-xs py-1 px-2 rounded pointer-events-none">
                  {section.label}
                </span>

                                {/* Dot */}
                                <div
                                    className={`w-3 h-3 rounded-full transition-all duration-300 
                            ${
                                        activeSection === section.id
                                            ? "bg-white scale-125"
                                            : "bg-white/50 hover:bg-white/80"
                                    }`}
                                ></div>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Introduction Section - With responsive image handling */}
            <section
                ref={introRef}
                className="min-h-[75vh] flex items-center justify-center mb-12"
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
                            </div>                            <div className="w-full md:w-3/5">
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
                    <div className="hidden md:flex justify-center">
                        <button
                            onClick={() => scrollToSection("author")}
                            className="group flex items-center gap-2 px-5 transition-all text-base sm:text-lg leading-relaxed mb-4"
                        >
                            About The Author
                            <svg
                                className="w-4 h-4 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
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

            <section
                ref={authorRef}
                className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6"
            >
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col md:flex-row gap-8 items-center w-full my-3 md:mb-24">
                            {/* Image Container - Larger and with better styling */}
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

                        {/* Navigation button - below content with original styling */}
                        <div className="flex justify-center gap-4 text-base sm:text-lg leading-relaxed mb-4">
                            <button
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    });
                                    setActiveSection("intro");
                                }}
                                className="hidden group md:flex items-center justify-center gap-2 px-5 py-2 transition-all"
                                aria-label="Back to top of page"
                            >
                                <svg
                                    className="w-4 h-4 animate-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7-7m0 0l-7 7m7-7v18"
                                    />
                                </svg>
                                About CodeScripted
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}