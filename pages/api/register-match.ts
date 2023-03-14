import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../src/mongodb";
import { ObjectId } from "mongodb";
import { Match } from "../../src/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tournamentId, classId, playerId1, playerId2, score } = req.body;

  if (!tournamentId || !classId || !playerId1 || !playerId2) {
    return res.status(400).json({
      message: "Tournament ID, class ID, and player IDs are required",
    });
  }

  if (playerId1 === playerId2) {
    return res
      .status(400)
      .json({ message: "Player IDs must be different for a match" });
  }

  const db = await connectToDatabase();
  const tournamentsCollection = db.collection("tournaments");
  const playersCollection = db.collection("players");

  const tournament = await tournamentsCollection.findOne({
    _id: new ObjectId(tournamentId),
  });

  if (!tournament) {
    return res.status(404).json({ message: "Tournament not found" });
  }

  const player1 = await playersCollection.findOne({
    _id: new ObjectId(playerId1),
  });

  const player2 = await playersCollection.findOne({
    _id: new ObjectId(playerId2),
  });

  if (!player1 || !player2) {
    return res.status(404).json({ message: "Players not found" });
  }

  // Check if the players are in the same class and have played the required number of matches
  const matches = tournament.matches[classId];
  const requiredMatches = tournament.matchesPerClass;
  const classPlayers = tournament.classes[classId];

  if (
    classPlayers.indexOf(playerId1) === -1 ||
    classPlayers.indexOf(playerId2) === -1
  ) {
    return res.status(400).json({
      message: "Players must be in the same class to play a match",
    });
  }

  const player1Matches = matches.filter(
    (m: Match) => m.player1Id === playerId1 || m.player2Id === playerId1
  );
  const player2Matches = matches.filter(
    (m: Match) => m.player1Id === playerId2 || m.player2Id === playerId2
  );

  if (
    player1Matches.length >= requiredMatches &&
    player2Matches.length >= requiredMatches
  ) {
    return res.status(400).json({
      message: "Players have already played the maximum number of matches",
    });
  }

  // Register the match
  const newMatch = {
    player1: playerId1,
    player2: playerId2,
    score,
  };

  const result = await tournamentsCollection.updateOne(
    {
      _id: new ObjectId(tournamentId),
    },
    {
      $push: {
        ["matches." + classId]: newMatch,
      },
    }
  );

  if (result.modifiedCount === 1) {
    res.status(201).json({ message: "Match registered successfully" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
}
