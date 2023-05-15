import { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    //
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // 작성자
      required: true,
    },
    commentIndex: {
      //댓글 번호
      type: Number,
      required: true,
    },
    commentText: {
      //댓글 내용
      type: String,
      required: true,
    },
  },
  {
    // 타임스탬프와 DB에서 사용할 컬렉션 이름 설정
    timestamps: true,
    collection: "scores",
  }
);

export default CommentSchema;
