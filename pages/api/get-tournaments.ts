import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../src/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const db = await connectToDatabase();
  const collection = db.collection('tournaments');
  const tournament = await collection.findOne({ current: true });

  if (!tournament) {
    res.status(404).json({ message: 'No current tournament found' });
  } else {
    res.status(200).json(tournament);
  }
}