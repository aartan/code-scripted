import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

interface GetAllPostsParams {
  page?: number;
  postsPerPageFirst?: number;
  postsPerPageSubsequent?: number;
}

interface GetAllPostsResult {
  posts: Post[];
  totalPosts: number;
}

interface GetAllPostsParams {
  page?: number;
  postsPerPageFirst?: number;
  postsPerPageSubsequent?: number;
  searchQuery?: string; // New search query parameter
}

export function getAllPosts({
  page = 1,
  postsPerPageFirst = 4,
  postsPerPageSubsequent = 6,
  searchQuery = "", // Default to an empty string
}: GetAllPostsParams = {}): GetAllPostsResult {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  if (searchQuery) {
    // Filter posts based on the search query
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const totalPosts = posts.length;

  let paginatedPosts: Post[];
  if (page === 1) {
    paginatedPosts = posts.slice(0, postsPerPageFirst + 1);
  } else {
    const startIndex =
      postsPerPageFirst + (page - 2) * postsPerPageSubsequent + 1;
    const endIndex = startIndex + postsPerPageSubsequent;
    paginatedPosts = posts.slice(startIndex, endIndex);
  }

  return {
    posts: paginatedPosts,
    totalPosts,
  };
}
