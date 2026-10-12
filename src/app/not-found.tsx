// app/not-found.tsx
import Link from "next/link";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <Container>
        {/* Added min-h-[60vh] to ensure the content takes more vertical space */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-24 text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-lg mb-8 max-w-md">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors hover:opacity-70"
          >
            Return to Home
          </Link>
        </div>
      </Container>
    </>
  );
}
