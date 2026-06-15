// NavigationDots.tsx
interface NavigationDotsProps {
    sections: { id: string; label: string }[];
    activeSection: string;
    onSectionChange: (section: string) => void;
    isTransitioning: boolean;
}

export default function NavigationDots({
                                           sections,
                                           activeSection,
                                           onSectionChange,
                                           isTransitioning
                                       }: NavigationDotsProps) {
    return (
        <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
            <div className="py-3 px-2 bg-black/20 backdrop-blur-sm rounded-full">
                <div className="flex flex-col space-y-5">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionChange(section.id)}
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
    );
}