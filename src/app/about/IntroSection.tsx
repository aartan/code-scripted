import Image from "next/image";
import { RefObject } from "react";

interface IntroSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  isMobile: boolean;
  isActive?: boolean;
  onReadMore?: (() => void) | undefined; // Changed to optional to handle hiding
  isTransitioning?: boolean;
}

export default function IntroSection({
  sectionRef,
  isMobile,
  isActive = true,
  onReadMore,
  isTransitioning,
}: IntroSectionProps) {
  // Common content rendering
  const renderContent = () => (
    <>
      <div
        className={`
    w-full ${isMobile ? "" : "md:w-2/5"} 
    relative h-72 rounded-xl overflow-hidden 
    shadow-2xl 
    border border-gray-200 
    bg-gradient-to-r from-blue-50 to-indigo-50
    ${isMobile ? "mb-6" : "md:mr-8 mb-6 md:mb-0"}
`}
      >
        {/* Optional decorative element */}
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 z-0"></div>

        <Image
          src="/assets/blog/codescripted.webp"
          alt="Programming Code"
          fill
          sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, 80vw"}
          priority
          className="object-cover relative z-10"
        />

        {/* Optional subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent z-20"></div>
      </div>
      <div className={`w-full ${isMobile ? "" : "md:w-3/5"}`}>
        <p className="text-base sm:text-lg leading-relaxed mb-4">
          This blog is dedicated to exploring the latest trends, tools, and
          techniques in software development and technology. Whether you're a
          seasoned developer or just starting out, you'll find valuable insights
          and tutorials that will help you level up your coding skills.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-4">
          Here at CodeScripted, we believe in the power of code to solve
          real-world problems and create amazing applications. My mission is to
          provide high- quality, practical content that developers can use in
          their day-to-day work.
        </p>
      </div>
    </>
  );

  // Mobile version
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="intro"
        className="min-h-[75vh] flex items-center justify-center mb-12"
      >
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex flex-col gap-8 items-center my-12">
            {renderContent()}
          </div>
        </div>
      </section>
    );
  }

  // Desktop version with animations
  return (
    <section
      ref={sectionRef}
      className={`absolute w-full h-[75%] flex items-center justify-center transition-all duration-1000 ease-in-out
                ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center md:my-24">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {renderContent()}
          </div>
        </div>
        {onReadMore && (
          <div className="flex justify-center">
            <button
              onClick={onReadMore}
              className="group flex items-center gap-2 text-base sm:text-lg leading-relaxed mb-4"
              disabled={isTransitioning}
              style={{
                transition: "all 0.3s ease",
                color: "currentColor" /* Dynamic color based on theme */,
              }}
              onMouseEnter={(e) => {
                // Detect if we're in dark mode or light mode by checking the background color
                const isDarkMode = window
                  .getComputedStyle(document.body)
                  .backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                const brightness = isDarkMode
                  ? parseInt(isDarkMode[1]) * 0.299 +
                    parseInt(isDarkMode[2]) * 0.587 +
                    parseInt(isDarkMode[3]) * 0.114
                  : 255;

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
                const isDarkMode = window
                  .getComputedStyle(document.body)
                  .backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)/);
                const brightness = isDarkMode
                  ? parseInt(isDarkMode[1]) * 0.299 +
                    parseInt(isDarkMode[2]) * 0.587 +
                    parseInt(isDarkMode[3]) * 0.114
                  : 255;

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
        )}
      </div>
    </section>
  );
}
