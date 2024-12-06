/* eslint-disable @typescript-eslint/no-unused-vars */
import { bookData, newBookData } from 'schemas/books';

export const getBookData = async (searchQuery?: string) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/books`;
  if (searchQuery) {
    url += `?q=${encodeURIComponent(searchQuery)}`;
  }
  const res = await fetch(url, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch book data');
  return res.json();
};

export const postBookData = async (bookData: newBookData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    throw new Error('Failed to add book');
  }

  return res.json();
};

export const getBookById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch book data');
  return res.json();
};

export const updateBook = async (
  id: string,
  { _id, ...updateData }: bookData
): Promise<bookData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    }
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to update book: ${errorData.error}`);
  }
  return res.json();
};

export const deleteBook = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
};
