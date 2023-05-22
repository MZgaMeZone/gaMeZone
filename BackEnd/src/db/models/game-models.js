import mongoose from "mongoose";
import GameSchema from "../schemas/game-schema.js";
import CategorySchema from "../schemas/category-schema.js";
import ScoreSchema from "../schemas/score-schema.js";
import { nanoid } from "nanoid"; // npm install nanoid 로 라이브러리 설치해야 함
import dayjs from "dayjs"; // npm install dayjs 로 라이브러리 설치해야 함

const Game = mongoose.model("games", GameSchema);
const Category = mongoose.model("categories", CategorySchema);

class GameModel {
  async createNewGame(data) {
    // 새 게임정보 등록하기. [Joi에서 사전 검증할 예정임]
    const newGame = await Game.create(data);
    return newGame;
  }

  async findAllGames() {
    // 등록된 모든 게임목록을 불러오기. 없을 경우 에러가아니라 빈 배열을 리턴함.
    const findGames = await Game.find({});
    if (findGames.length < 1) {
      console.log(`등록된 게임이 없습니다.`);
    }
    return findGames;
  }
  async deleteGame(id) {
    // id로 검색하여 게임정보를 삭제하기
    // 이 부분은 고민이 필요하다. 사실상 작동 코드는 클라이언트에 있을거기 때문에,
    // 백단에서 삭제하는 게 어떤 의미를 지니는 거지?
    try {
      const deleteGame = await Game.deleteOne({ _id: id });
      return deleteGame;
    } catch (e) {
      console.log(`[게임 삭제 실패] 해당 id에 일치하는 게임정보가 없습니다.`);
      throw new Error(e);
    }
  }
  async updateGame(id, data) {
    // id로 검색하고, data로 전달한 게임정보를 수정하기 [Joi에서 사전 검증할 예정임]
    const updateGame = await Game.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true } // 이 옵션은 업데이트 이후에 업데이트된 문서를 반환합니다.
    );
    return updateGame;
  }
  async findGamesByCategory(data) {
    try {
      const games = await Game.find({ gameCategory: data }).exec();
      return games;
    } catch (error) {
      console.error("게임 데이터 검색 실패:", error);
      throw new Error("게임 데이터 검색 실패");
    }
  }
}

const gameModel = new GameModel();
export { gameModel };
