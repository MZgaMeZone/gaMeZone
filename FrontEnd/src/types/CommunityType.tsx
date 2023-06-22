export interface CategoryType {
  boardCategory: string;
}

export interface PostType {
  _id: string;
  title: string;
  content?: string;
  author: {
    nickname: string;
    email: string;
  };
  category: string;
  createdAt: string;
}

export type PostListType = PostType[];
