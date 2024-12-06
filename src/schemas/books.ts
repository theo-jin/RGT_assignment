import { z } from 'zod';

export const bookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  author: z.string(),
  price: z.number(),
  unitSales: z.number(),
  stock: z.number(),
  description: z.string(),
});

export type bookData = z.infer<typeof bookSchema>;

export const newBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  price: z.number(),
  unitSales: z.number(),
  stock: z.number(),
  description: z.string(),
});

export type newBookData = z.infer<typeof newBookSchema>;
