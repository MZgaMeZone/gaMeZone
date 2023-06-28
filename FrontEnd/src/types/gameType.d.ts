export interface manualDataType {
  _id: string;
  gameTitle: string;
  gameCategory: string[];
  gameIconUrl: string;
  gameImageUrl: string;
  gameDescription: string;
  gameManual: string;
  gameServiceStatus: string;
}

export interface RankingDataType {
  gameId?: string;
  userNickname?: string;
  averageScore?: number;
  highScore?: number;
  score?: number;
  userIcon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Top3BoxProps {
  userData: RankingDataType;
  index: number;
  perGame: boolean;
}

export interface AllHonorsBoxProps {
  userData: RankingDataType;
  index: number;
  perGame: boolean;
}
