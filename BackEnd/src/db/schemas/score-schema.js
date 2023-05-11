import { Schema } from "mongoose";

const ScoreSchema = new Schema(
  {
    // 게임 기록정보는 게임명, 유저아이디, 날짜, 기록이 저장되어야 할 것임.
    gameTitle: {
      type: Schema.Types.ObjectId,
      ref: "Game", // 참조할 모델 이름
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // 참조할 모델 이름
      required: true,
    },
    totalScores: {
      //해당 회차에 시행한 모든 점수
      score: [
        {
          type: Number,
          required: true,
        },
      ],
    },
    averageScore: {
      //평균 점수
      type: Number,
      required: true,
    },
    highScore: {
      //최고 점수
      type: Number,
      required: true,
    },
  },
  {
    // 타임스탬프와 DB에서 사용할 컬렉션 이름 설정
    timestamps: true,
    collection: "scores",
  }
);

export default ScoreSchema;
