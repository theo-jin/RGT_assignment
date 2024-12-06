import { bookData } from 'schemas/books';

interface BookDetailProps {
  book: bookData;
}

export default function BookDetail({ book }: BookDetailProps) {
  const { title, author, price, stock, unitSales, description } = book;
  return (
    <div className="p-4 border rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-2">저자: {author}</p>
      <p className="text-gray-600 mb-2">가격: {price}$</p>
      <p className="text-gray-600 mb-2">재고: {stock}권</p>
      <p className="text-gray-600 mb-2">판매량: {unitSales}권</p>
      <p className="mt-4">{description}</p>
    </div>
  );
}
