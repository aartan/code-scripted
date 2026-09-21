// app/page.tsx
// This is a Server Component (no "use client" directive)

import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { Pagination } from "@/app/_components/pagination";
import { getAllPosts } from "@/lib/api";
import { SearchForm } from "./_components/searchform";
import ClientPageWrapper from "./_components/client-page-wrapper";

export default function Index({
  searchParams,
}: {
  searchParams: { page?: string; query?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10) || 1;
  const searchQuery = searchParams.query || "";

  // This runs on the server
  const { posts, totalPosts } = getAllPosts({
    page,
    postsPerPageFirst: 4,
    postsPerPageSubsequent: 6,
    searchQuery,
  });

  const totalPages = Math.ceil((totalPosts - 1) / 9);
  const heroPost =
    page === 1 && !searchQuery && posts.length > 0 ? posts[0] : null;
  const morePosts = page === 1 && !searchQuery ? posts.slice(1) : posts;

  // Extract all image URLs for preloading
  const allImageUrls = posts.map((post) => post.coverImage);

  // Wrap the content with a client component that handles image preloading
  return (
    <ClientPageWrapper imageUrls={allImageUrls}>
      <main>
        <Container>
          <Intro />
          <SearchForm searchQuery={searchQuery} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 ? (
            <MoreStories
              posts={morePosts}
              showHeading={page === 1 && !searchQuery}
            />
          ) : (
            <p>No results found.</p>
          )}
          <Pagination currentPage={page} totalPages={totalPages} />
        </Container>
      </main>
    </ClientPageWrapper>
  );
}
