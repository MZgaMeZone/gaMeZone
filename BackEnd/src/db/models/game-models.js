import mongoose from "mongoose";
import GameSchema from "../schemas/game-schema.js";
import ScoreSchema from "../schemas/score-schema.js";
import { nanoid } from "nanoid"; // npm install nanoid 로 라이브러리 설치해야 함
import dayjs from "dayjs"; // npm install dayjs 로 라이브러리 설치해야 함

const Game = mongoose.model("games", GameSchema);
const Score = mongoose.model("scores", ScoreSchema);

class GameModel {
  async findAllGames() {
    // 등록된 모든 게임목록을 불러오기
    const findGames = await Game.find({});
    if (findGames.length < 1) {
      console.log(`등록된 게임이 없습니다`);
    }
    return findGames;
  }

  async findAllScores(game) {
    // 게임명으로 검색하여 모든 기록정보를 불러오기
    // 무한스크롤이나 페이지네이션을 구현해야 할 것임.
    const findScores = await Score.find({ gameTitle: game });
    return findScores;
  }
}

const gameModel = new GameModel();
export { gameModel };
