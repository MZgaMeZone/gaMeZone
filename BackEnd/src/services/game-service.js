import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { gameModel } from "../db/index.js";

class GameService {
  constructor() {
    this.gameModel = gameModel;
  }

  async createNewGame(data) {
    return await gameModel.createNewGame(data);
  }
  async findAllGames() {
    return await gameModel.findAllGames();
  }
  async deleteGame(id) {
    return await gameModel.deleteGame(id);
  }
  async updateGame(id, data) {
    return await gameModel.updateGame(id, data);
  }
}

const gameService = new GameService(gameModel);
export default gameService;
