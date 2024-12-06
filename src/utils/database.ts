/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from 'mongodb';

const url = `mongodb+srv://${process.env.MONGODB}@cluster0.fjn7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const options = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongo) {
    (global as any)._mongo = new MongoClient(url).connect();
  }
  connectDB = (global as any)._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}
export { connectDB };
