'use client';

import { useQuery } from '@tanstack/react-query';
import BookList from '@/components/bookList';
import { getBookData } from 'actions/fetchBooks';

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => getBookData(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <BookList books={data} />
    </div>
  );
}
