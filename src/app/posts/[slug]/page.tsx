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
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Post({ params }: Params) {
  // Await the params promise
  const resolvedParams = await params;

  // Access the slug from the resolved params
  const slug = resolvedParams.slug as string;

  if (!slug) {
    return notFound();
  }

  const post: Post | null = getPostBySlug(slug);

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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  // Await the params promise
  const resolvedParams = await params;

  // Access the slug from the resolved params
  const slug = resolvedParams.slug as string;

  if (!slug) {
    return notFound();
  }

  const post: Post | null = getPostBySlug(slug);

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
