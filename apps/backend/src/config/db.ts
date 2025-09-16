import mongoose from 'mongoose';

export async function connectToDatabase(connectionUri: string): Promise<void> {
  if (!connectionUri) {
    throw new Error('MONGO_URL is not defined');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(connectionUri);
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
}


