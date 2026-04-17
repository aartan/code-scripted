import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mb-6">
      <ul className="flex justify-center space-x-4">
        {currentPage > 1 && (
          <li>
            <Link href={`/?page=${currentPage - 1}`} className="text-black hover:underline">
              Previous
            </Link>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <Link href={`/?page=${number}`} className={`${number === currentPage ? "font-bold text-black" : "text-gray-500 hover:underline"}`}>
              {number}
            </Link>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <Link href={`/?page=${currentPage + 1}`} className="text-black hover:underline">
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
