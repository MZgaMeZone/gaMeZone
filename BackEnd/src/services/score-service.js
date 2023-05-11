import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { scoreModel } from "../db/index.js";

class ScoreService {
  constructor() {
    this.scoreModel = scoreModel;
  }

  // 필요한 기능 : 게임정보 추가, 게임정보 수정, 게임 삭제
}

const scoreService = new ScoreService(scoreModel);
export default scoreService;
