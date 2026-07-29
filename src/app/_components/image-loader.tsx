"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageLoaderProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
                                                     src,
                                                     alt,
                                                     width,
                                                     height,
                                                     className = "",
                                                     priority = false
                                                 }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    return (
        <div className="relative w-full h-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                priority={priority}
                onLoadingComplete={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setIsError(true);
                }}
            />

            {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                    <p className="text-gray-500">Failed to load image</p>
                </div>
            )}
        </div>
    );
};

export default ImageLoader;