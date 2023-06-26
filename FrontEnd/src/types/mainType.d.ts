// body, footer
export type MainBodyProps = {
  mainModal: boolean;
  setMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CategoryType {
  _id: string;
  categoryName: string;
}

export interface GameListType {
  _id: string;
  gameCategory: string[];
  gameDescription: string;
  gameImageUrl: string;
  gameManual: string;
  gameOption: string;
  gameServiceStatus: string;
  gameTitle: string;
  gameUrl: string;
}

// header, main
export interface HitGame {
  name: string;
  url: string;
  img: string;
}

export interface MainHeaderProps {
  hitGameList: HitGame[];
}
