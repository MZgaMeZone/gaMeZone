export interface CategoryType {
  boardcategory: string;
}

export interface PostType {
  _id: string;
  title: string;
  content: string;
  image?: string;
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
  boardcategory: string;
}
