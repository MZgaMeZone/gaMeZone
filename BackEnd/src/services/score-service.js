import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { scoreModel } from "../db/index.js";

class ScoreService {
  constructor() {
    this.scoreModel = scoreModel;
  }
  //GET
  async findScoresByGame(id) {
    return await scoreModel.findScoresByGame(id);
  }

  //GET
  async findScoresByGameId(id) {
    return await scoreModel.findScoresByGameId(id);
  }
  //GET
  async findScoresByNickname(nickname) {
    return await scoreModel.findScoresByNickname(nickname);
  }
  //GET
  async findScoresById(id) {
    return await scoreModel.findScoresById(id);
  }
  //POST
  async createScoreBoard(data) {
    return await scoreModel.createScoreBoard(data);
  }
  //GET
  async calculateRanking(id, option) {
    return await scoreModel.calculateRanking(id, option);
  }
  //DELETE
  async deleteScore(id) {
    return await scoreModel.deleteScore(id);
  }
  async userRanking() {
    return await scoreModel.userRanking();
  }

  async updateScore(userEmail, userNickname) {
    return await scoreModel.updateScore(userEmail, userNickname);
  }
  async deleteScoreByUserNickname(userNickname) {
    return await scoreModel.deleteScoreByUserNickname(userNickname);
  }
}

const scoreService = new ScoreService(scoreModel);
export { scoreService };
