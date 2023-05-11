import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { gameModel } from "../db/index.js";

class GameService {
  constructor() {
    this.gameModel = gameModel;
  }

  // 필요한 기능 : 게임정보 추가, 게임정보 수정, 게임 삭제
}

const gameService = new GameService(gameModel);
export default gameService;
