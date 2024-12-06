'use client';

import { useQuery } from '@tanstack/react-query';
import BookList from '@/components/bookList';
import Searchbar from '@/components/searchBar';
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
      <section>
        <Searchbar />
      </section>
      <section>
        <BookList books={data} />
      </section>
    </div>
  );
}
