export interface User {
  gameName: string;
  tagLine: string;
  puuid: string;
  profileIconId: number;
  summonerLevel: number;
  revisionDate: number;
}

export interface Tier {
  tier: string;
  rank: string;
  leaguePoints: number;
  queueType: string;
  wins: number;
  losses: number;
}
