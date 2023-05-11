import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { scoreModel } from "../db/index.js";

class ScoreService {
  constructor() {
    this.scoreModel = scoreModel;
  }
  async findScoresByGame(id) {
    return await scoreModel.fundScoresByGame(id);
  }
  async findSocresById(id) {
    return await scoreModel.findSocresById(id);
  }
  async createScoreBoard(data) {
    return await scoreModel.createScoreBoard(data);
  }
  async calculateRanking(id, option) {
    return await scoreModel.calculateRanking(id, option);
  }
  async deleteScore(id) {
    return await scoreModel.deleteScore(id);
  }
}

const scoreService = new ScoreService(scoreModel);
export { scoreService };
