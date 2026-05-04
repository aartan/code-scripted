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
    const footerRef = useRef<HTMLDivElement>(null);


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
            const totalHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const bottomThreshold = totalHeight - viewportHeight - 100;

            if (window.scrollY >= bottomThreshold) {
                setActiveSection("footer");
            } else if (authorRef.current && scrollPosition >= authorRef.current.offsetTop) {
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
        if (section === "footer") {
            targetRef = footerRef.current;
        } else if (section === "author") {
            targetRef = authorRef.current;
        } else {
            targetRef = introRef.current;
        }

        // Check if we're on mobile or desktop
        const isMobile = window.innerWidth < 768; // Adjust based on your mobile breakpoint

        // If not mobile, apply the offset for sections like "intro" or "author"
        if (!isMobile && targetRef) {
            if (section === "intro" || section === "author") {
                offset = 150; // Adjust this value according to your header height
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
        { id: "intro", label: "Introduction" },
        { id: "author", label: "About the Author" },
        { id: "footer", label: "Contact" }
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

            {/* Introduction Section - Adjusted to keep header visible */}
            <section
                ref={introRef}
                className="min-h-[calc(80vh)] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 mb-4"
            >
                <div className="w-full max-w-3xl mx-auto">
                    <div className="dark:bg-[#0D1117] rounded-2xl shadow-lg p-5 sm:p-8 backdrop-blur-sm">
                        <p className="text-base sm:text-lg leading-relaxed mb-4">
                            Welcome to CodeScripted! This blog is dedicated to exploring the latest
                            trends, tools, and techniques in software development and technology.
                            Whether you're a seasoned developer or just starting out, you'll find valuable
                            insights and tutorials that will help you level up your coding skills.
                        </p>

                        <p className="text-base sm:text-lg leading-relaxed mb-6">
                            Here at CodeScripted, we believe in the power of code to solve real-world
                            problems and create amazing applications. My mission is to provide high-
                            quality, practical content that developers can use in their day-to-day work.
                        </p>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => scrollToSection("author")}
                                className="group flex items-center gap-2 px-5 py-2.5
                         transition-all"
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
                </div>
            </section>

            {/* Author Section - Adjusted to keep header visible */}
            {/* Author Section - Improved button positioning */}
            <section
                ref={authorRef}
                className="min-h-[calc(80vh)] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8"
            >
                <div className="w-full max-w-3xl mx-auto">
                    <div className="dark:bg-[#0D1117] rounded-2xl shadow-lg p-5 sm:p-8 backdrop-blur-sm">
                        {/* Author content */}
                        <div className="flex flex-col items-center">
                            {/* Image Container */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative rounded-full overflow-hidden
                   border-2 sm:border-3 border-gray-200 dark:border-gray-700 shadow-md mb-5">
                                <Image
                                    src="/assets/blog/authors/me.png"
                                    alt="Abdifatah"
                                    fill
                                    sizes="(max-width: 640px) 6rem, (max-width: 768px) 7rem, 8rem"
                                    priority
                                    className="object-cover"
                                />
                            </div>

                            {/* Text content */}
                            <div className="w-full">
                                <p className="text-sm sm:text-base leading-relaxed mb-2 text-center">
                                    My name is Abdifatah, and I'm a software engineer who enjoys solving
                                    problems using code and building things that make a difference. Throughout
                                    my career, I've had the privilege of working with some outstanding teams
                                    and these experiences have allowed me to sharpen my expertise in web
                                    development.
                                </p>

                                <p className="text-sm sm:text-base leading-relaxed mb-2 text-center">
                                    I've spent a lot of time in the trenches, tackling complex problems and
                                    crafting solutions that make a real difference. Through CodeScripted, I'm
                                    excited to share what I've learned, offer insights, and dive deep into the
                                    technologies and practices that drive our industry forward.
                                </p>

                                <p className="text-sm sm:text-base leading-relaxed mb-6 text-center">
                                    Thank you for visiting, and I hope you find the content both informative and
                                    inspiring. Feel free to reach out if you have any questions, suggestions, or
                                    just want to connect!
                                </p>
                            </div>
                        </div>

                        {/* Navigation buttons - Placed together at the bottom for consistency */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    });
                                    setActiveSection("intro");
                                }}
                                className="group flex items-center justify-center gap-2 px-5 py-2
                    bg-transparent rounded-full transition-all"
                                aria-label="Back to top of page"
                            >
                                <svg
                                    className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
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
                                Back to Top
                            </button>

                            <button
                                onClick={() => scrollToSection("footer")}
                                className="group flex items-center justify-center gap-2 px-5 py-2
                    bg-transparent rounded-full transition-all"
                                aria-label="Navigate to contact section"
                            >
                                Let's Connect
                                <svg
                                    className="w-4 h-4 group-hover:translate-y-1 transition-transform"
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
                </div>
            </section>

            {/* Placeholder for footer section */}
            <div ref={footerRef} className="h-20" />
        </div>
    );
}