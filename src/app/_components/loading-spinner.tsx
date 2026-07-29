import React from 'react';

interface LoadingSpinnerProps {
    progress?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ progress }) => {
    const showProgress = progress !== undefined;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-white"></div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mt-4 text-gray-800">
                    CodeScripted<span className="text-blue-500">.</span>
                </h2>
                <p className="mt-2 text-gray-600">
                    {showProgress ? `Loading content... ${progress}%` : "Loading content..."}
                </p>

                {/* Progress bar - only shown when progress is provided */}
                {showProgress && (
                    <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};