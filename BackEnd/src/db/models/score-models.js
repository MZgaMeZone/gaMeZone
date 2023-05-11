import mongoose from "mongoose";
import GameSchema from "../schemas/game-schema.js";
import ScoreSchema from "../schemas/score-schema.js";
import { nanoid } from "nanoid"; // npm install nanoid 로 라이브러리 설치해야 함
import dayjs from "dayjs"; // npm install dayjs 로 라이브러리 설치해야 함

const Game = mongoose.model("games", GameSchema);
const Score = mongoose.model("scores", ScoreSchema);

class ScoreModel {
  async findScoresByGame(game) {
    // 게임명으로 검색하여 모든 기록정보를 불러오기
    // 무한스크롤이나 페이지네이션을 구현해야 할 것임.
    const findScores = await Score.find({ gameTitle: game });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }

  async findScoresById(userId) {
    // 유저아이디로 검색하여 달성한 모든 기록정보를 불러오기
    const findScores = await Score.find({ userId: userId });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }
}

const scoreModel = new ScoreModel();
export default scoreModel;
