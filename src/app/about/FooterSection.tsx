import { RefObject } from "react";
import Container from "@/app/_components/container";

interface FooterSectionProps {
    sectionRef: RefObject<HTMLDivElement>;
    isMobile: boolean;
    isActive?: boolean;
    onBackToTop?: () => void;
    isTransitioning?: boolean;
}

export default function FooterSection({
                                          sectionRef,
                                          isMobile,
                                          isActive = false,
                                          onBackToTop,
                                          isTransitioning
                                      }: FooterSectionProps) {
    // Render the actual footer content
    const renderFooterContent = () => (
        <div className="py-28 flex flex-col lg:flex-row items-center">
            <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                Stay Connected.
            </h3>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-16 lg:w-1/2">
                <a
                    href="/about"
                    className="rounded-md mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    About CodeScripted
                </a>
                <a
                    href="/contact"
                    className="rounded-md mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    Get in Touch
                </a>
                <a
                    target="_blank"
                    href="https://twitter.com/abdifatah_artan"
                    className="rounded-md mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    Follow on Twitter
                </a>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/abdifatah-artan"
                    className="rounded-md mx-3 bg-blue-600 hover:bg-white hover:text-blue-600 border border-blue-600 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    Connect on LinkedIn
                </a>
            </div>
        </div>
    );

    // Mobile version
    if (isMobile) {
        return (
            <footer
                ref={sectionRef}
                id="footer"
                className="w-full bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800"
            >
                <Container>
                    {renderFooterContent()}
                </Container>
            </footer>
        );
    }

    // Desktop version with animations and button just above footer
    return (
        <>
            {/* Back Button positioned just above the footer - only show when footer is active */}
            {isActive && onBackToTop && (
                <div
                    className={`fixed left-1/2 transform -translate-x-1/2 z-20
                        transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        bottom: `calc(${isActive ? "30vh" : "0"} + 20px)` // Position above the footer
                    }}
                >
                    <button
                        onClick={onBackToTop}
                        className="group flex items-center justify-center gap-2 px-5 py-2 text-base sm:text-lg transition-all"
                        aria-label="Back to author section"
                        disabled={isTransitioning}
                        style={{
                            transition: "all 0.3s ease",
                            color: "currentColor",
                        }}
                        onMouseEnter={(e) => {
                            const isDarkMode = window.getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                            const brightness = isDarkMode ?
                                (parseInt(isDarkMode[1]) * 0.299 + parseInt(isDarkMode[2]) * 0.587 + parseInt(isDarkMode[3]) * 0.114) : 255;

                            if (brightness < 128) {
                                e.currentTarget.style.color = "#ffffff";
                            } else {
                                e.currentTarget.style.color = "#000000";
                                e.currentTarget.style.fontWeight = "600";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }

                            const svgElement = e.currentTarget.querySelector("svg");
                            if (svgElement) {
                                svgElement.style.transform = "translateY(-3px)";
                                svgElement.style.opacity = "1";
                                svgElement.classList.remove("animate-bounce");
                            }
                        }}
                        onMouseLeave={(e) => {
                            const isDarkMode = window.getComputedStyle(document.body).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                            const brightness = isDarkMode ?
                                (parseInt(isDarkMode[1]) * 0.299 + parseInt(isDarkMode[2]) * 0.587 + parseInt(isDarkMode[3]) * 0.114) : 255;

                            if (brightness < 128) {
                                e.currentTarget.style.color = "#a0a6b5";
                            } else {
                                e.currentTarget.style.color = "#555555";
                                e.currentTarget.style.fontWeight = "normal";
                                e.currentTarget.style.transform = "translateY(0)";
                            }

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
                                d="M19 9l-7-7m0 0l-7 7m7-7v18"/>
                        </svg>
                        Go Back Up
                    </button>
                </div>
            )}

            {/* Footer content */}
            <footer
                ref={sectionRef}
                className={`fixed bottom-0 left-0 right-0 w-full
                    bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800
                    transition-all duration-1000 ease-in-out
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"}`}
                style={{
                    minHeight: "30vh",
                    zIndex: isActive ? 10 : -1,
                }}
            >
                <Container>
                    {renderFooterContent()}
                </Container>
            </footer>
        </>
    );
}