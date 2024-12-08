import { useState, useMemo } from 'react';
import { bookData } from 'schemas/books';

export function useBookSearch(books: bookData[]) {
  const [search, setSearch] = useState('');

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return { search, filteredBooks, handleSearchChange };
}
