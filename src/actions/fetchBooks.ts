/* eslint-disable @typescript-eslint/no-unused-vars */
import { bookData, newBookData } from 'schemas/books';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getBookData = async (searchQuery?: string) => {
  let url = `${BASE_URL}/api/books`;
  if (searchQuery) {
    url += `?q=${encodeURIComponent(searchQuery)}`;
  }
  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch book data:', await res.text());
    throw new Error('Failed to fetch book data');
  }

  return res.json();
};

export const postBookData = async (bookData: newBookData) => {
  const res = await fetch(`${BASE_URL}/api/books`, {
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
  const res = await fetch(`${BASE_URL}/api/books/${id}`, {
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
  const res = await fetch(`${BASE_URL}/api/books/${id}`, {
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
  const res = await fetch(`${BASE_URL}/api/books/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error('Failed to delete book:', await res.text());
    throw new Error('Failed to delete book');
  }

  return res.json();
};