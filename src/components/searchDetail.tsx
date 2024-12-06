'use client';

import { useQuery } from '@tanstack/react-query';
import Searchbar from './searchBar';
import BookList from './bookList';
import { getBookData } from 'actions/fetchBooks';

export default function SearchDetail({ q }: { q: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', q],
    queryFn: () => getBookData(q),
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div>
      <Searchbar />
      <h2>검색 결과: {q}</h2>
      <div>검색 결과 수: {data.length}</div>
      {data.length > 0 ? (
        <BookList books={data} />
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
