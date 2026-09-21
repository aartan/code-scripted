import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import PostClientWrapper from "@/app/_components/post-client-wrapper";
import type { Post } from "@/interfaces/post";

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
    <PostClientWrapper imageUrl={post.coverImage}>
      <main>
        <Container>
          <Header />
          <article className="mb-32 max-w-4xl mx-auto">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
            />
            <PostBody content={content} />
          </article>
        </Container>
      </main>
    </PostClientWrapper>
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
  const { posts } = getAllPosts();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
