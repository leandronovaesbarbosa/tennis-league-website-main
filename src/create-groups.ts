import { connectToDatabase } from "./mongodb";
import { Group, Match, Player, Tournament } from "./types";

function generateRoundRobinMatches(group: Group, tournamentId: string): Match[] {
  const matches: Match[] = [];

  const numPlayers = group.playerIds.length;

  for (let i = 0; i < numPlayers; i++) {
    for (let j = i + 1; j < numPlayers; j++) {
      matches.push({
        player1Id: group.playerIds[i],
        player2Id: group.playerIds[j],
        scheduledDate: new Date(),
        groupId: group.id,
        tournamentId,
      });
    }
  }

  return matches;
}

function generateGroups(players: Player[], groupSize: number): Group[] {
  const groups: Group[] = [];
  const topRankedPlayers = players.slice(0, groupSize * (Math.ceil(players.length / groupSize) - 1));

  for (let i = 0; i < topRankedPlayers.length; i++) {
    const playerId = topRankedPlayers[i].id!;
    const groupId = i % (players.length / groupSize);
    const groupName = String.fromCharCode("A".charCodeAt(0) + groupId);
    const groupIndex = groups.findIndex((group) => group.groupName === groupName);

    if (groupIndex === -1) {
      groups.push({
        tournamentId: topRankedPlayers[0].rankingPoints![Object.keys(topRankedPlayers[0].rankingPoints!)[0]]!.tournamentId,
        groupName,
        playerIds: [],
      });
    }

    groups[groupId].playerIds.push(playerId);
  }

  for (let i = 0; i < players.length; i++) {
    const playerId = players[i].id!;

    if (topRankedPlayers.includes(players[i])) {
      continue;
    }

    const smallestGroup = groups.reduce((acc, group, index) => {
      const sizeDiff = groupSize - group.playerIds.length;
      if (sizeDiff < acc.sizeDiff) {
        return {
          index,
          sizeDiff,
        };
      }

      return acc;
    }, { index: 0, sizeDiff: groupSize });

    groups[smallestGroup.index].playerIds.push(playerId);
  }

  return groups;
}

export async function defineGroupsAndMatches(tournamentId: string): Promise<void> {
  const db = await connectToDatabase();
  const tournament = await db.collection("tournaments").findOne({ id: tournamentId });

  if (!tournament) {
    throw new Error(`Tournament with id ${tournamentId} not found`);
  }

  const { playerIds } = tournament;
  const groups: Group[] = [];
  const matches: Match[] = [];

  // Create groups
  const groupSize = tournament.groupSize;
  const numGroups = Math.ceil(playerIds.length / groupSize);

  for (let i = 0; i < numGroups; i++) {
    const groupName = `Group ${String.fromCharCode("A".charCodeAt(0) + i)}`;
    const group: Group = {
      tournamentId,
      groupName,
      playerIds: playerIds.slice(i * groupSize, (i + 1) * groupSize),
    };
    groups.push(group);
  }

  // Create round robin matches for each group
  groups.forEach(
    (group) => generateRoundRobinMatches(group, tournamentId)
      .forEach(match => matches.push(match))
  );

  // Save groups and matches to database
  await Promise.all([
    db.collection("groups").insertMany(groups),
    db.collection("matches").insertMany(matches),
    db.collection("tournaments").updateOne({ id: tournamentId }, { $set: { groups, matches } }),
  ]);
}
