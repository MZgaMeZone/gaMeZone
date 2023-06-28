export interface RankingDataType {
  gameId?: string;
  userNickname?: string;
  averageScore?: number;
  highScore?: number;
  score?: number;
  userIcon?: string;
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
