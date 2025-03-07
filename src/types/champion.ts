// 각 챔피언의 능력치 정보
export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

// 챔피언 이미지 정보
export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

// 챔피언의 기본 정보 (공통)
export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

// 단일 챔피언 데이터
export interface ChampionDataItem {
  version?: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb?: string;
  info?: ChampionInfo;
  image?: ChampionImage;
  tags?: string[];
  partype?: string;
  stats?: ChampionStats;
}

// Profile 추가
export interface Champ extends ChampionDataItem {
  profile: string;
}

// 전체 API 응답의 구조
export interface ChampionsResponse {
  type: string;
  format: string;
  version: string;
  data: {
    [championName: string]: ChampionDataItem;
  };
}

export interface ChampSkin {
  name: string;
  image: string;
  num: number;
}
