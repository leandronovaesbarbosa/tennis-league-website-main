import { connectToDatabase } from "./mongodb";

export type Class = "D" | "C" | "B" | "A" | "Feminino";

export type Tournament = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  class: Class;
  type: "groupAndRoundRobin" | "roundRobinOnly";
  groupSize: number;
  playerIds?: string[];
  matches?: Match[]; // matches may be optional if we're creating a new tournament and there aren't any matches yet
  groups?: Group[];
};

export type Match = {
  id?: string;
  tournamentId: string;
  player1Id: string;
  player2Id: string;
  scheduledDate: Date;
  score?: string; // score may be optional if the match hasn't been played yet
  location?: string;
  playedDate?: Date; // playedDate is optional until the match is played
  groupId?: string;
};

export type Group = {
  id?: string;
  tournamentId: string;
  groupName: string;
  playerIds: string[];
};

export type Player = {
  id?: string;
  name: string;
  email: string;
  classes: string[];
  rankingPoints?: Record<string, number>; // rankingPoints may be optional if we're creating a new player and they don't have any ranking points yet
};