"use client";
import cn from "classnames";
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
  className,
  priority = false,
  onLoad,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  return (
    <div className="sm:mx-0 w-full">
      <div className="relative aspect-[16/9] w-full">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-md animate-pulse" />
        )}
        <Image
          src={src}
          alt={`Cover Image for ${title}`}
          className={cn("shadow-sm rounded-md object-cover", className, {
            "opacity-0": isLoading,
            "opacity-100 transition-opacity duration-300": !isLoading,
          })}
          fill={true}
          sizes="(max-width: 768px) 100vw, 1200px"
          priority={priority}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default CoverImage;
