export interface GameInfo {
  _id: string;
  gameTitle: string;
  gameIconUrl: string;
  gameImageUrl: string;
  gameCategory: string;
  gameDescription: string;
  gameManual: string;
  gameServiceStatus: string;
}

export type GameData = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  description: string;
  menual: string;
  status: string;
};
