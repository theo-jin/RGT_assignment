'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { newBookData } from 'schemas/books';
import { postBookData } from 'app/actions/fetchBooks';

const initialBookData: newBookData = {
  title: '',
  author: '',
  price: 0,
  unitSales: 0,
  stock: 0,
  description: '',
};

export default function RegisterBook() {
  const [formData, setFormData] = useState(initialBookData);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'unitSales' || name === 'stock'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postBookData(formData);
      router.push('/');
    } catch (error) {
      console.error('책 등록 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">새 책 등록</h1>
      <div>
        <label htmlFor="title" className="block">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="author" className="block">
          저자
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block">
          가격
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="unitSales" className="block">
          판매량
        </label>
        <input
          type="number"
          id="unitSales"
          name="unitSales"
          value={formData.unitSales}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="stock" className="block">
          재고
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block">
          설명
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          등록
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          취소
        </button>
      </div>
    </form>
  );
}
