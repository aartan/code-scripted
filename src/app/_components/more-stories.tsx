import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
  showHeading?: boolean; // Optional prop to control the heading display
};

export function MoreStories({ posts, showHeading = true }: Props) {
  return (
    <section>
      {showHeading && (
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Posts
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-13 gap-y-10 md:gap-y-16 mb-16">
        {posts.map((post) => (
          <div key={post.slug} className="h-full">
            {" "}
            {/* Ensure consistent height for all cards */}
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
