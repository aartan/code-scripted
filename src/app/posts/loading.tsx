// app/posts/[slug]/loading.tsx
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default function PostLoading() {
  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          {/* Title and cover image placeholder */}
          <div className="mb-8 md:mb-16 sm:mx-0">
            <div className="w-full aspect-[16/1] bg-gray-200 rounded-md animate-pulse mb-8" />

            <div className="w-full aspect-[2/1] bg-gray-200 rounded-md animate-pulse" />
          </div>
          {/* Post date */}
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 text-lg">
              <div className="w-32 h-4 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Post body */}
          <div className="max-w-2xl mx-auto">
            {/* Paragraph placeholders */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="mb-8">
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-3/5 h-4 bg-gray-200 rounded-md animate-pulse" />
              </div>
            ))}

            {/* Heading placeholder */}
            <div className="w-2/3 h-8 bg-gray-200 rounded-md animate-pulse my-8" />

            {/* More paragraph placeholders */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="mb-8">
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-4/5 h-4 bg-gray-200 rounded-md animate-pulse" />
              </div>
            ))}

            {/* Code block placeholder */}
            <div className="w-full h-32 bg-gray-200 rounded-md animate-pulse my-8" />

            {/* Final paragraphs */}
            {[1, 2].map((item) => (
              <div key={item} className="mb-8">
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse mb-2" />
                <div className="w-4/5 h-4 bg-gray-200 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
