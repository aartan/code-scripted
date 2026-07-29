"use client";

import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import { useState } from "react";

type Props = {
    title: string;
    coverImage: string;
    date: string;
};

export function PostHeader({ title, coverImage, date }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} src={coverImage} priority={true} onLoad={() => setImageLoaded(true)} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date} />
                </div>
                <div className="mb-12">
                    <h1 className="text-4xl font-bold leading-tight lg:text-6xl mb-4">
                        {title}
                    </h1>
                </div>
            </div>
        </>
    );
}