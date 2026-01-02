import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import type { Post } from "@/interfaces/post"; // Use type-only import

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post: Post | null = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post: Post | null = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | CodeScripted`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const { posts } = getAllPosts(); // Assuming getAllPosts() returns an object with a 'posts' array.

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
