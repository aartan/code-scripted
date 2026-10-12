// app/global-error.tsx
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-red-600">
              Something went wrong!
            </h1>
            <p className="mb-8 text-gray-700">
              We've encountered a critical error. Our team has been notified.
            </p>
            <button
              onClick={reset}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
