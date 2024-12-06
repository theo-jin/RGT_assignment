/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from 'utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const db = (await connectDB).db('bookData');

  switch (req.method) {
    case 'GET':
      try {
        const book = await db
          .collection('bookData')
          .findOne({ _id: new ObjectId(id as string) });
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch book data' });
      }
      break;

    case 'PUT':
      try {
        const updatedBook = await db
          .collection('bookData')
          .findOneAndUpdate(
            { _id: new ObjectId(id as string) },
            { $set: req.body },
            { returnDocument: 'after' }
          );
        res.status(200).json(updatedBook);
      } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({
          error: 'Failed to update book data',
        });
      }
      break;

    case 'DELETE':
      try {
        const result = await db
          .collection('bookData')
          .deleteOne({ _id: new ObjectId(id as string) });

        res.status(200).json({ message: 'Book deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
