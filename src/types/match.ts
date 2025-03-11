export interface Match {
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  participants: Participant[];
  teams: [];
}

export interface Participant {
  items: number[];
  perks: [];
  win: boolean;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  puuid: string;
  myPriRune: { icon: string };
  mySubRune: { icon: string };
  mySpell1: any;
  mySpell2: any;
}
