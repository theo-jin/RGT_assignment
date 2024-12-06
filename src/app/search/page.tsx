import BookList from '@/components/bookList';
import Searchbar from '@/components/searchBar';
import { getBookData } from 'actions/fetchBooks';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const books = await getBookData(q);

  return (
    <div>
      <Searchbar />
      <h2>검색 결과: {q}</h2>
      <div>검색 결과 수: {books.length}</div>
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
