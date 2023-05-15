import { Schema } from "mongoose";

const BoardSchema = new Schema(
  {
    //
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // 작성자
      required: true,
    },
    boardTitle: {
      //최고 점수
      type: String,
      required: true,
    },
    boardPost: {
      //최고 점수
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

export default BoardSchema;
