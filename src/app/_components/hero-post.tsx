"use client";
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

export function HeroPost({ title, coverImage, date, excerpt, slug }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const [truncatedExcerpt, setTruncatedExcerpt] = useState(excerpt);

  useEffect(() => {
    setIsClient(true);
    // Limit title to a certain number of characters
    const maxTitleLength = 60;
    if (title.length > maxTitleLength) {
      setTruncatedTitle(title.slice(0, maxTitleLength) + "...");
    }
    // Adjust the length of the excerpt based on a character limit
    const maxExcerptLength = 300;
    const truncated =
      excerpt.length > maxExcerptLength
        ? excerpt.slice(0, maxExcerptLength) + "..."
        : excerpt;
    setTruncatedExcerpt(truncated);
  }, [title, excerpt]);

  // The main content section
  const sectionContent = (
    <section className="card mb-8 md:mb-12 h-full">
      <div className="mb-8 md:mb-16">
        {/* Render the cover image without any link functionality */}
        <CoverImage
          title={title}
          src={coverImage}
          className="w-full object-cover rounded-md hover:shadow-lg transition-shadow duration-200"
          priority={true}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight min-h-[4rem]">
            {truncatedTitle}
          </h3>
          <div className="mb-4 md:mb-0 text-lg min-h-[1.5rem]">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{truncatedExcerpt}</p>
        </div>
      </div>
    </section>
  );

  // Only render the Link wrapper if we're on the client side
  if (isClient) {
    return <Link href={`/posts/${slug}`}>{sectionContent}</Link>;
  }

  return sectionContent;
}
