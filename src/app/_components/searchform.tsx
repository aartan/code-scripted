"use client"; // Ensure this is at the top of the file

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchForm.module.css';

export function SearchForm({ searchQuery }: { searchQuery: string }) {
  const [query, setQuery] = useState(searchQuery);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/?query=${query}`);
  };

  const handleClear = () => {
    setQuery('');
    router.push(`/`);
  };

  return (
    <div className={styles['search-form-container']}>
      <form onSubmit={handleSubmit} className={styles['search-form']}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className={styles['search-input']}
        />
        <button type="submit" className={styles['search-button']}>
          Search
        </button>
        {query && (
          <button type="button" onClick={handleClear} className={styles['clear-button']}>
            Clear
          </button>
        )}
      </form>
    </div>
  );
}
