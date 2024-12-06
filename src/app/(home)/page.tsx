import BookList from '@/components/bookList';
import Searchbar from '@/components/searchBar';
import { getBookData } from 'actions/fetchBooks';

export default async function Home() {
  const books = await getBookData();

  return (
    <div>
      <section>
        <Searchbar />
      </section>
      <section>
        <BookList books={books} />
      </section>
    </div>
  );
}
