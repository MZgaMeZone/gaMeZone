export interface CommentDataType {
  _id: string;
  content: string;
  author: {
    _id: string;
    nickname: string;
    email?: string;
  };
  post: string;
  createdAt: string;
  postId?: string;
}

export type CommentListType = CommentDataType[];

export interface CommentData {
  author: string;
  content: string;
}

export type CommentDataList = CommentData[];

export interface CommentListProps {
  comment: CommentDataType;
  postId: string;
}

export interface ModifiedCommentProps {
  postId: string;
  closeModal: (patchModal: boolean) => void;
  commentId: string;
}

export interface CreateCommentProps {
  postId: string | undefined;
  closeModal: (patchModal: boolean) => void;
}

export interface CommentIdType {
  commentId: string | undefined;
}

export interface CommentProps {
  postId: string;
  category: string;
}
