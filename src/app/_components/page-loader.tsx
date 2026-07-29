"use client";

import React, { useEffect, useState } from 'react';

interface PageLoaderProps {
    children: React.ReactNode;
    imageUrls: string[];
}

const PageLoader: React.FC<PageLoaderProps> = ({ children, imageUrls }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        if (!imageUrls.length) {
            setIsLoading(false);
            return;
        }

        let loadedImages = 0;
        const totalImages = imageUrls.length;

        // Preload all images
        const preloadImages = imageUrls.map(url => {
            return new Promise<void>((resolve) => {
                const img = new Image();

                img.onload = () => {
                    loadedImages++;
                    setLoadProgress(Math.floor((loadedImages / totalImages) * 100));

                    if (loadedImages === totalImages) {
                        // All images loaded, show the content
                        setTimeout(() => setIsLoading(false), 500); // Small delay for smoother transition
                    }
                    resolve();
                };

                img.onerror = () => {
                    loadedImages++;
                    setLoadProgress(Math.floor((loadedImages / totalImages) * 100));

                    if (loadedImages === totalImages) {
                        // All images attempted to load, show the content
                        setTimeout(() => setIsLoading(false), 500);
                    }
                    resolve();
                };

                img.src = url;
            });
        });

        // Add a timeout to prevent eternal loading if some images fail to load
        const timeoutPromise = new Promise<void>(resolve => {
            setTimeout(() => {
                setIsLoading(false);
                resolve();
            }, 5000); // 5-second max wait time
        });

        Promise.race([Promise.all(preloadImages), timeoutPromise]);

        // Cleanup
        return () => {
            // Cancel any pending operations
        };
    }, [imageUrls]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
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
                    <p className="mt-2 text-gray-600">Loading content... {loadProgress}%</p>

                    {/* Progress bar */}
                    <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default PageLoader;