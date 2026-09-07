"use client";

import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function HeroPost({
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
    const maxTitleLength = 60; // Set the maximum number of characters allowed for the title
    if (title.length > maxTitleLength) {
      setTruncatedTitle(title.slice(0, maxTitleLength) + "...");
    }

    // Adjust the length of the excerpt based on a character limit
    const maxExcerptLength = 300; // Set your base max length for the excerpt
    const truncated = excerpt.length > maxExcerptLength ? excerpt.slice(0, maxExcerptLength) + "..." : excerpt;

    setTruncatedExcerpt(truncated);
  }, [title, excerpt]);

  const content = (
    <section className="card mb-8 md:mb-12 h-full">
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} className="w-full object-cover rounded-md" priority={true}/>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight min-h-[4rem]">{truncatedTitle}</h3> {/* Set min-height */}
          <div className="mb-4 md:mb-0 text-lg min-h-[1.5rem]"> {/* Set min-height */}
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{truncatedExcerpt}</p>
        </div>
      </div>
    </section>
  );

  if (isClient) {
    return (
      <Link href={`/posts/${slug}`}>
        {content}
      </Link>
    );
  }

  return content;
}
