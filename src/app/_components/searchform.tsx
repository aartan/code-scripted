"use client"; // Ensure this is at the top of the file

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchForm.module.css";

export function SearchForm({ searchQuery }: { searchQuery: string }) {
  const [query, setQuery] = useState(searchQuery);
  const router = useRouter();

  // Debounce function to prevent too many router pushes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== searchQuery) {
        if (query) {
          router.push(`/?query=${query}`);
        } else {
          router.push("/");
        }
      }
    }, 100); // 500ms delay before executing search

    return () => clearTimeout(timer);
  }, [query, router, searchQuery]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // The form submit is now just a fallback, the main search happens on keypress
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Clear the search field when Escape key is pressed
    if (e.key === "Escape" && query) {
      setQuery("");
      router.push("/");
    }
  };

  return (
    <div className={styles["search-form-container"]}>
      <form onSubmit={handleSubmit} className={styles["search-form"]}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search posts..."
          className={styles["search-input"]}
        />
      </form>
    </div>
  );
}
