import Image from "next/image";
import { RefObject } from "react";

interface AuthorSectionProps {
    sectionRef: RefObject<HTMLDivElement>;
    isMobile: boolean;
    isActive?: boolean;
    onBackToTop?: () => void;
    isTransitioning?: boolean;
}

export default function AuthorSection({
                                          sectionRef,
                                          isMobile,
                                          isActive = true,
                                          onBackToTop,
                                          isTransitioning
                                      }: AuthorSectionProps) {
    // Common content rendering
    const renderContent = () => (
        <>
            <div className={`${isMobile ? 'w-32 h-32' : 'w-32 h-32 md:w-48 md:h-48'} relative rounded-full overflow-hidden
                border-2 border-gray-200 dark:border-gray-600 shadow-lg
                flex-shrink-0 ${isMobile ? '' : 'md:mr-8'} mb-6 ${isMobile ? '' : 'md:mb-0'}`}>
                <Image
                    src="/assets/blog/authors/me.png"
                    alt="Abdifatah"
                    fill
                    sizes={isMobile ? "8rem" : "(max-width: 768px) 8rem, 12rem"}
                    priority
                    className="object-cover"
                />
            </div>

            <div className={`${isMobile ? 'w-full' : 'flex-grow'}`}>
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
        </>
    );

    // Mobile version
    if (isMobile) {
        return (
            <section
                ref={sectionRef}
                id="author"
                className="min-h-[90vh] flex items-center justify-center px-4 sm:px-6 mb-16"
            >
                <div className="w-full max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col gap-8 items-center w-full my-3">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Desktop version with animations
    return (
        <section
            ref={sectionRef}
            className={`absolute w-full h-[75%] flex items-center justify-center px-4 sm:px-6 transition-all duration-1000 ease-in-out
                ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
        >
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col md:flex-row gap-8 items-center w-full my-3 md:mb-24">
                        {renderContent()}
                    </div>

                    {/* Navigation button */}
                    {onBackToTop && (
                        <div className="flex justify-center gap-4 text-base sm:text-lg leading-relaxed mb-4">
                            <button
                                onClick={onBackToTop}
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
                    )}
                </div>
            </div>
        </section>
    );
}