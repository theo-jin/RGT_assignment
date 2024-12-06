'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BookItem from '@/components/bookItem';
import BookPagination from './pagination';
import { bookData } from 'schemas/books';

const ITEMS_PER_PAGE = 10;

interface BookListProps {
  books: bookData[];
}

export default function BookList({ books }: BookListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  if (books.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAddBook = () => {
    router.push('/register');
  };

  return (
    <div>
      {selectedBooks.map((book) => (
        <BookItem key={book._id} {...book} />
      ))}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleAddBook}
          className="h-10 rounded-md px-8 bg-primary text-primary-foreground shadow hover:bg-primary/90"
        >
          책 추가
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <BookPagination
          currentPage={currentPage}
          totalItems={books.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
