// app/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Header />
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6">500</h1>
        <h2 className="text-2xl mb-8">Internal Server Error</h2>
        <p className="mb-8">Sorry, something went wrong on our server.</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Container>
  );
}
