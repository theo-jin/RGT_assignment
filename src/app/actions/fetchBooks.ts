/* eslint-disable @typescript-eslint/no-unused-vars */
import { bookData, newBookData } from 'schemas/books';

export const getBookData = async () => {
  const res = await fetch(`/api/books`);

  if (!res.ok) {
    console.error('Failed to fetch book data:', await res.text());
    throw new Error('Failed to fetch book data');
  }

  return res.json();
};

export const postBookData = async (bookData: newBookData) => {
  const res = await fetch(`/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    console.error('Failed to add book:', await res.text());
    throw new Error('Failed to add book');
  }

  return res.json();
};

export const getBookById = async (id: string) => {
  const res = await fetch(`/api/books/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch book by ID:', await res.text());
    throw new Error('Failed to fetch book data');
  }

  return res.json();
};

export const updateBook = async (
  id: string,
  { _id, ...updateData }: bookData
): Promise<bookData> => {
  const res = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Failed to update book:', errorData);
    throw new Error(`Failed to update book: ${errorData.error}`);
  }

  return res.json();
};

export const deleteBook = async (id: string) => {
  const res = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error('Failed to delete book:', await res.text());
    throw new Error('Failed to delete book');
  }

  return res.json();
};
