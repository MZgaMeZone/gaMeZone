export interface CategoryType {
  boardCategory: string;
}

export interface PostType {
  _id: string;
  title: string;
  content: string;
  author: {
    _id?: string;
    nickname: string;
    email: string;
  };
  category: string;
  createdAt: string;
}

export type PostListType = PostType[];

export interface PostData {
  title: string;
  content: string;
}

export interface PostDataProps {
  postId: string | undefined;
  boardCategory: string;
}
