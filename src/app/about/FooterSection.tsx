import { RefObject } from "react";
import Container from "@/app/_components/container";

interface FooterSectionProps {
    sectionRef: RefObject<HTMLDivElement>;
    isMobile: boolean;
    isActive?: boolean;
    onBackToTop?: () => void;
    isTransitioning?: boolean;
}

// People Networking Illustration Component with Dark Mode Enhancements
const NetworkingIllustration = () => (
    <svg
        width="500"
        height="500"
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-full h-auto"
    >
        {/* Central Person */}
        <circle cx="120" cy="80" r="18" fill="#3B82F6" className="dark:fill-blue-400" />
        <circle cx="120" cy="80" r="22" stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.5" className="dark:stroke-opacity-0" />
        <circle cx="120" cy="62" r="8" fill="#3B82F6" className="dark:fill-blue-400" /> {/* Head */}

        {/* Connected People - Enhanced for dark mode with softer colors */}
        {/* Person 1 */}
        <circle cx="60" cy="40" r="12" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" />
        <circle cx="60" cy="28" r="6" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" /> {/* Head */}

        {/* Person 2 */}
        <circle cx="180" cy="40" r="12" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" />
        <circle cx="180" cy="28" r="6" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" /> {/* Head */}

        {/* Person 3 */}
        <circle cx="60" cy="120" r="12" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" />
        <circle cx="60" cy="108" r="6" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" /> {/* Head */}

        {/* Person 4 */}
        <circle cx="180" cy="120" r="12" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" />
        <circle cx="180" cy="108" r="6" fill="#000000" className="dark:fill-gray-400 dark:stroke-gray-300 dark:stroke-1 dark:stroke-opacity-30" /> {/* Head */}

        {/* Small people - Enhanced for dark mode with softer colors */}
        {/* Person 5 */}
        <circle cx="30" cy="80" r="8" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" />
        <circle cx="30" cy="72" r="4" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" /> {/* Head */}

        {/* Person 6 */}
        <circle cx="210" cy="80" r="8" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" />
        <circle cx="210" cy="72" r="4" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" /> {/* Head */}

        {/* Person 7 */}
        <circle cx="90" cy="20" r="8" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" />
        <circle cx="90" cy="12" r="4" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" /> {/* Head */}

        {/* Person 8 */}
        <circle cx="150" cy="20" r="8" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" />
        <circle cx="150" cy="12" r="4" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" /> {/* Head */}

        {/* Person 9 */}
        <circle cx="90" cy="140" r="8" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" />
        <circle cx="90" cy="132" r="4" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" /> {/* Head */}

        {/* Person 10 */}
        <circle cx="150" cy="140" r="8" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" />
        <circle cx="150" cy="132" r="4" fill="#000000" opacity="0.7" className="dark:fill-gray-500 dark:opacity-100" /> {/* Head */}

        {/* Connection Lines - Adjusted to match the new icon colors */}
        <line x1="96" y1="80" x2="38" y2="80" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />
        <line x1="144" y1="80" x2="202" y2="80" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />
        <line x1="120" y1="56" x2="120" y2="28" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />
        <line x1="120" y1="104" x2="120" y2="132" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />

        <line x1="103" y1="63" x2="70" y2="46" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />
        <line x1="137" y1="63" x2="170" y2="46" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />
        <line x1="103" y1="97" x2="70" y2="114" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />
        <line x1="137" y1="97" x2="170" y2="114" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" className="dark:stroke-gray-400 dark:stroke-opacity-70" />

        <line x1="90" y1="28" x2="65" y2="34" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" className="dark:stroke-gray-400 dark:stroke-opacity-50" />
        <line x1="150" y1="28" x2="175" y2="34" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" className="dark:stroke-gray-400 dark:stroke-opacity-50" />
        <line x1="90" y1="132" x2="65" y2="126" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" className="dark:stroke-gray-400 dark:stroke-opacity-50" />
        <line x1="150" y1="132" x2="175" y2="126" stroke="#000000" strokeWidth="1" strokeOpacity="0.2" className="dark:stroke-gray-400 dark:stroke-opacity-50" />

        {/* Communication Animation - Hide in dark mode */}
        <g className="dark:opacity-0">
            <circle cx="120" cy="80" r="30" fill="transparent" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.4">
                <animate attributeName="r" values="30;45;30" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
        </g>

        {/* Message Animations */}
        <g>
            {/* Message 1 */}
            <rect
                x="120"
                y="80"
                width="10"
                height="6"
                rx="2"
                fill="#9CA3AF"
                opacity="0"
                className="dark:fill-white"
            >
                <animate attributeName="x" values="120;70;60" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y" values="80;50;40" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
            </rect>

            {/* Message 2 */}
            <rect
                x="120"
                y="80"
                width="10"
                height="6"
                rx="2"
                fill="#9CA3AF"
                opacity="0"
                className="dark:fill-white"
            >
                <animate attributeName="x" values="120;170;180" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="y" values="80;50;40" dur="2.3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="2.3s" repeatCount="indefinite" />
            </rect>

            {/* Message 3 */}
            <rect
                x="120"
                y="80"
                width="10"
                height="6"
                rx="2"
                fill="#9CA3AF"
                opacity="0"
                className="dark:fill-white"
            >
                <animate attributeName="x" values="120;70;60" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="y" values="80;110;120" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" repeatCount="indefinite" />
            </rect>

            {/* Message 4 */}
            <rect
                x="120"
                y="80"
                width="10"
                height="6"
                rx="2"
                fill="#9CA3AF"
                opacity="0"
                className="dark:fill-white"
            >
                <animate attributeName="x" values="120;170;180" dur="2.1s" repeatCount="indefinite" />
                <animate attributeName="y" values="80;110;120" dur="2.1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="2.1s" repeatCount="indefinite" />
            </rect>
        </g>

    </svg>
);

export default function FooterSection({
                                          sectionRef,
                                          isMobile,
                                          isActive = false,
                                      }: FooterSectionProps) {
    // Render the original footer content
    const renderFooterContent = () => (
        <div className="py-28 flex flex-col lg:flex-row items-center">
            <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                Stay Connected.
            </h3>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-16 lg:w-1/2">
                <a
                    href="/"
                    className="flex items-center justify-center md:min-h-[75px] rounded-md mx-3 bg-black hover:opacity-70 border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    Home
                </a>
                <a
                    href="/contact"
                    className="rounded-md mx-3 bg-black hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    Get in Touch
                </a>
                <a
                    target="_blank"
                    href="https://twitter.com/abdifatah_artan"
                    className="rounded-md mx-3 bg-black hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                >
                    Follow on Twitter
                </a>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/abdifatah-artan"
                    className="rounded-md mx-3 bg-blue-600 hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
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
            {/* Networking illustration - placed in the white space above the footer */}
            <div
                className={`fixed left-1/2 transform -translate-x-1/2 z-10
                    transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    bottom: `calc(${isActive ? "30vh" : "0"} + 100px)`,
                    pointerEvents: isActive ? 'auto' : 'none'
                }}
            >
                <NetworkingIllustration />
            </div>

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