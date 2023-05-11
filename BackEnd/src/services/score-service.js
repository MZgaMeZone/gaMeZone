import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { scoreModel } from "../db/index.js";

class ScoreService {
  constructor() {
    this.scoreModel = scoreModel;
  }

  // 필요한 기능 : 랭킹조회, 랭킹초기화, 랭킹삭제
}

const scoreService = new ScoreService(scoreModel);
export default scoreService;
