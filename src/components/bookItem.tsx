import Link from 'next/link';
import { bookData } from 'schemas/books';

export default function BookItem({ _id, title, author, price }: bookData) {
  return (
    <Link
      href={`/${_id}`}
      className="flex gap-4 p-5 border-b border-gray-300 text-black no-underline"
    >
      <div>
        <div className="font-bold">{title}</div>
        <div className="text-gray-500">{author}</div>
        <div className="break-keep"> {price}$</div>
      </div>
    </Link>
  );
}
