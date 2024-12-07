/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from 'utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('handler 진입');
  console.log(req.method);
  if (req.method === 'GET') {
    console.log(req.method);
    try {
      const db = (await connectDB).db('bookData');
      const bookData = await db.collection('bookData').find().toArray();
      console.log(bookData);
      res.status(200).json(bookData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch book data' });
    }
  } else if (req.method === 'POST') {
    try {
      const db = (await connectDB).db('bookData');
      const newBook = req.body;
      const result = await db.collection('bookData').insertOne(newBook);
      res
        .status(201)
        .json({ message: 'Book added successfully', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add book' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
