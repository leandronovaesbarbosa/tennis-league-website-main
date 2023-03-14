import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../src/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, classes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const db = await connectToDatabase();
  const playersCollection = db.collection("players");

  const player = {
    name,
    email,
    classes: classes || [],
    rankings: {},
  };

  try {
    const result = await playersCollection.insertOne(player);

    const createdPlayer = {
      id: result.insertedId.toHexString(),
      ...player,
    };

    res.status(201).json(createdPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
