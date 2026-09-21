"use client";

import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  src: string;
  slug?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
};

const CoverImage = ({
  title,
  src,
  slug,
  className,
  priority = false,
  onLoad,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const imageComponent = (
    <div className="relative aspect-[16/9] w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-md animate-pulse" />
      )}
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn("shadow-sm rounded-md object-cover", className, {
          "hover:shadow-lg transition-shadow duration-200": slug,
          "opacity-0": isLoading,
          "opacity-100 transition-opacity duration-300": !isLoading,
        })}
        fill={true}
        sizes="(max-width: 768px) 100vw, 1200px"
        priority={priority}
        onLoad={handleImageLoad}
      />
    </div>
  );

  return (
    <div className="sm:mx-0 w-full">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {imageComponent}
        </Link>
      ) : (
        imageComponent
      )}
    </div>
  );
};

export default CoverImage;
