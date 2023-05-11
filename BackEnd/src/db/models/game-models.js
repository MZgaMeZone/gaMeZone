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
}

const gameModel = new GameModel();
export { gameModel };
