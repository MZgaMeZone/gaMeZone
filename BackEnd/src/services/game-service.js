import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { gameModel } from "../db/index.js";

class GameService {
  constructor() {
    this.gameModel = gameModel;
  }
  //POST
  async createNewGame(data) {
    return await gameModel.createNewGame(data);
  }
  //GET
  async findAllGames() {
    return await gameModel.findAllGames();
  }
  //GET
  async findGame(id) {
    return await gameModel.findGame(id);
  }
  //DELETE
  async deleteGame(id) {
    return await gameModel.deleteGame(id);
  }
  //PATCH
  async updateGame(id, data) {
    return await gameModel.updateGame(id, data);
  }
  //GET
  async findGamesByCategory(data) {
    return await gameModel.findGamesByCategory(data);
  }
}

const gameService = new GameService(gameModel);
export { gameService };
