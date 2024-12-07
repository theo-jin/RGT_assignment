'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBookById, updateBook, deleteBook } from 'app/actions/fetchBooks';
import BookDetail from '@/components/bookDetail';
import BookEditForm from '@/components/bookEditForm';
import { queryClient } from 'app/providers/TanStackQueryProvider.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { bookData } from 'schemas/books';
export interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}
export default function Page({ params }: ProductDetailPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const { id } = use(params);

  const { data, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id),
  });

  const updateMutation = useMutation<bookData, Error, bookData>({
    mutationFn: (updatedBookData) => updateBook(id, updatedBookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', id] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      router.push('/');
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedBookData: bookData) => {
    updateMutation.mutate(updatedBookData);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setIsDeleteDialogOpen(false);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!data) return <div>책을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col gap-4">
      {isEditing ? (
        <BookEditForm
          book={data}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <BookDetail book={data} />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              수정
            </button>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-red-500 text-white rounded">
                  삭제
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>책 삭제 확인</DialogTitle>
                  <DialogDescription>
                    정말로 이 책을 삭제하시겠습니까?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    삭제
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500  text-white rounded "
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    취소
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
