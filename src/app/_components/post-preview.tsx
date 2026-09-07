"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) {
  const [isClient, setIsClient] = useState(false);
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const [truncatedExcerpt, setTruncatedExcerpt] = useState(excerpt);

  useEffect(() => {
    setIsClient(true);

    // Limit title to a certain number of characters
    const maxTitleLength = 80; // Set the maximum number of characters allowed for the title
    if (title.length > maxTitleLength) {
      setTruncatedTitle(title.slice(0, maxTitleLength) + "...");
    }

    // Adjust the length of the excerpt based on a character limit
    const maxExcerptLength = 300; // Set your base max length for the excerpt
    const truncated = excerpt.length > maxExcerptLength ? excerpt.slice(0, maxExcerptLength) + "..." : excerpt;

    setTruncatedExcerpt(truncated);
  }, [title, excerpt]);

  const content = (
    <div className="post-preview-card flex flex-col justify-between mt-6 mb-0 h-full">
      <div>
        <div className="mb-5">
          <CoverImage slug={slug} title={title} src={coverImage} className="w-128 h-64 object-cover rounded-md" priority={true} />
        </div>
        <h3 className="text-3xl mb-3 leading-snug min-h-[5rem]">{truncatedTitle}</h3> {/* Increased min-height to 4.5rem */}
        <div className="text-lg min-h-[1.5rem]"> {/* Set min-height to 1.5rem */}
          <DateFormatter dateString={date} />
        </div>
      </div>
      <p className="post-preview-excerpt text-lg leading-relaxed mb-0 min-h-[5rem]">{truncatedExcerpt}</p> {/* Increased min-height to 5rem */}
    </div>
  );

  if (isClient) {
    return (
      <Link href={`/posts/${slug}`} passHref>
        {content}
      </Link>
    );
  }

  return content;
}
