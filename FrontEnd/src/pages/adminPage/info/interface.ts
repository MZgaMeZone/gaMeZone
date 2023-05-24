export interface GameInfo {
  _id: string;
  gameTitle: string;
  gameIconUrl: string;
  gameImageUrl: string;
  gameCategory: any; // 문자열로 입력받지만, string[] 으로 보내야 하는 값이어서 일단 any 처리함 by dw
  gameDescription: string;
  gameManual: string;
  gameServiceStatus: string;
}

export type GameData = {
  id: string;
  name: string;
  imageUrl: string;
  category: any; // 문자열로 입력받지만, string[] 으로 보내야 하는 값이어서 일단 any 처리함 by dw
  description: string;
  menual: string;
  status: string;
};
