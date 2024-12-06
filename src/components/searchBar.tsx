'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams?.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-2.5 mb-5">
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className="flex-1 px-4 py-3 rounded border border-gray-300"
        placeholder="검색어를 입력하세요"
      />
      <button
        onClick={onSubmit}
        className="w-20 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
      >
        검색
      </button>
    </div>
  );
}
