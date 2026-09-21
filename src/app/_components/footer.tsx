"use client";
import { useState, useRef } from "react";
import Container from "@/app/_components/container";

export function Footer() {
  const sectionRef = useRef(null);
  const [hoverStates, setHoverStates] = useState({
    home: false,
    contact: false,
    twitter: false,
    linkedin: false,
    codescripted: false,
    author: false,
  });

  // Handle hover state for interactive elements
  const handleMouseEnter = (key: string) => {
    setHoverStates((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (key: string) => {
    setHoverStates((prev) => ({ ...prev, [key]: false }));
  };

  // Handler for internal navigation links
  const handleInternalLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    // Let the default navigation behavior work
    // We're keeping this function in case you want to add custom logic later
    // but not preventing the default behavior
  };

  // Render the enhanced footer content with animations
  const renderEnhancedFooter = () => (
    <div className="py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8 lg:mb-12">
        <h3
          className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-8 lg:mb-0 lg:pr-4 lg:w-1/2
                               relative z-10 group"
        >
          <span>Stay Connected</span>
          <span>.</span>
          <span
            className="absolute -bottom-2 left-0 w-0 h-1 bg-black dark:bg-white dark:bg-opacity-30 transition-all duration-300
                                    group-hover:w-full lg:group-hover:w-3/4 opacity-0 group-hover:opacity-30"
          ></span>
        </h3>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Social Icons with animations */}
            <a
              href="https://twitter.com/abdifatah_artan"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white
                                    hover:bg-gray-900 transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => handleMouseEnter("twitter")}
              onMouseLeave={() => handleMouseLeave("twitter")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/abdifatah-artan"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white
                                    hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => handleMouseEnter("linkedin")}
              onMouseLeave={() => handleMouseLeave("linkedin")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white
                                    hover:bg-gray-900 transition-all duration-300 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Animated Link Buttons */}
        <a
          href="/"
          className={`relative group overflow-hidden rounded-md bg-black text-white font-bold 
                             flex items-center justify-center h-16 transition-all duration-300
                             hover:opacity-70 border-black`}
          onMouseEnter={() => handleMouseEnter("home")}
          onMouseLeave={() => handleMouseLeave("home")}
        >
          <span className="relative z-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </span>
          <span
            className={`absolute bottom-0 left-0 h-1 bg-white opacity-30 transition-all duration-500 ease-out 
                                    ${hoverStates.home ? "w-full" : "w-0"}`}
          ></span>
        </a>
        <a
          href="/about#intro"
          onClick={(e) => handleInternalLink(e, "intro")}
          className={`relative group overflow-hidden rounded-md bg-black text-white font-bold 
                             flex items-center justify-center h-16 transition-all duration-300
                             hover:opacity-70`}
          onMouseEnter={() => handleMouseEnter("codescripted")}
          onMouseLeave={() => handleMouseLeave("codescripted")}
        >
          <span className="relative z-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            CodeScripted
          </span>
          <span
            className={`absolute bottom-0 left-0 h-1 bg-white opacity-30 transition-all duration-500 ease-out 
                                    ${hoverStates.codescripted ? "w-full" : "w-0"}`}
          ></span>
        </a>

        <a
          href="/about#author"
          onClick={(e) => handleInternalLink(e, "author")}
          className={`relative group overflow-hidden rounded-md bg-black text-white font-bold 
                             flex items-center justify-center h-16 transition-all duration-300
                             hover:opacity-70`}
          onMouseEnter={() => handleMouseEnter("author")}
          onMouseLeave={() => handleMouseLeave("author")}
        >
          <span className="relative z-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Author
          </span>
          <span
            className={`absolute bottom-0 left-0 h-1 bg-white opacity-30 transition-all duration-500 ease-out 
                                    ${hoverStates.author ? "w-full" : "w-0"}`}
          ></span>
        </a>
        <a
          href="/contact"
          className={`relative group overflow-hidden rounded-md bg-black text-white font-bold 
                             flex items-center justify-center h-16 transition-all duration-300
                             hover:opacity-70`}
          onMouseEnter={() => handleMouseEnter("contact")}
          onMouseLeave={() => handleMouseLeave("contact")}
        >
          <span className="relative z-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Get in Touch
          </span>
          <span
            className={`absolute bottom-0 left-0 h-1 bg-white opacity-30 transition-all duration-500 ease-out 
                                    ${hoverStates.contact ? "w-full" : "w-0"}`}
          ></span>
        </a>
      </div>

      {/* Bottom Section with Copyright */}
      <div className="mt-6 pt-8 border-gray-200 dark:border-gray-700">
        <div className="flex justify-center text-center">
          <div className="mb-6 md:mb-0">
            <p>
              © {new Date().getFullYear()} CodeScripted. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <footer
      ref={sectionRef}
      className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800"
    >
      <Container>{renderEnhancedFooter()}</Container>
    </footer>
  );
}

export default Footer;
