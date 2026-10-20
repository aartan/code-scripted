// app/loading.tsx - This is a Server Component
import Container from "@/app/_components/container";

export default function Loading() {
  return (
    <main>
      <Container>
        <div className="py-6">
          {/* Logo and tagline */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold tracking-tight">
                CodeScripted<span className="text-blue-500">.</span>
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="w-60 h-5 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Search form */}
          <div className="mb-8">
            <div className="w-full border border-gray-300 rounded-md px-3 py-2 flex items-center">
              <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Hero post */}
          <div className="mb-10">
            <div className="mb-6">
              <div className="w-full aspect-[21/9] bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div flex-row>
              <div className="w-full h-24 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>

          {/* More Stories heading */}
          <div className="mb-10">
            <div className="w-48 h-12 bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* Posts grid - 2x2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-16">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col">
                <div className="aspect-[16/9] bg-gray-200 rounded-md mb-4 animate-pulse" />
                <div className="w-3/4 h-6 bg-gray-200 rounded-md mb-2 animate-pulse" />
                <div className="w-1/4 h-4 bg-gray-200 rounded-md mb-4 animate-pulse" />
                <div className="w-full h-16 bg-gray-200 rounded-md animate-pulse" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center my-8">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-8 h-8 bg-blue-200 rounded-md animate-pulse" />
              <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-16 h-8 bg-gray-200 rounded-md animate-pulse ml-2" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t">
            <div className="flex justify-between items-center">
              <div className="w-40 h-6 bg-gray-200 rounded-md animate-pulse" />
              <div className="flex space-x-4">
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-16 h-6 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
