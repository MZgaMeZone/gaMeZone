import { Router } from "express";
import jwt from "jsonwebtoken";
import { scoreService } from "../services/index.js";
import { loginRequired } from "../middlewares/login-required.js";
// import { userChecker } from "../middlewares/userValidation.js";

const scoreRouter = Router();

// 해당 game의 모든 기록정보를 가져오는 GET 요청
scoreRouter.get("/games/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    console.log("🖐️ 해당 게임의 기록을 요청합니다.");
    const scoreList = await scoreService.findScoresByGame(gameId);
    console.log("✔️ 해당 게임의 모든 기록을 불러오는 데 성공했습니다!");
    res.status(201).json(scoreList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 해당 user의 모든 기록정보를 가져오는 GET 요청
scoreRouter.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("🖐️ 해당 유저의 기록을 요청합니다.");
    const scoreList = await scoreService.findScoresById(userId);
    console.log("✔️ 해당 유저의 모든 기록을 불러오는 데 성공했습니다!");
    res.status(201).json(scoreList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 새 기록을 등록하는 POST 요청
scoreRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    console.log("🖐️ 게임 기록을 DB에 저장합니다.");
    const newScore = await scoreService.createScoreBoard(data);
    console.log("✔️ 기록이 등록되었습니다!");
    res.status(201).json(newScore);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 게임 랭킹순으로 정렬해서 가져오는 GET 요청
// 상위 몇명을 불러올지 pagenation 세팅해야함 (model혹은 service에서)
// 쿼리 파라미터로 &num={number} 을 전달함. 만약 없을경우, 전체 데이터를 불러옴.
scoreRouter.get("/:id/:option", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const option = req.params.option;
    const query = req.query.num;

    // console.log("🖐️ 랭킹을 불러옵니다.");
    const rankingData = await scoreService.calculateRanking(gameId, option);
    // console.log("✔️ 랭킹 로딩 완료!");
    if (!query) {
      res.status(201).json(rankingData);
    }
    const selectedRanking = rankingData.slice(0, query);
    res.status(201).json(selectedRanking);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 해당 game의 모든 기록정보를 가져오는 GET 요청
scoreRouter.get("/honors", async (req, res, next) => {
  try {
    console.log("🖐️ 명예의 전당을 출력합니다.");
    const honor = await scoreService.userRanking();
    console.log("✔️ 명예의 전당에 오신 것을 환영합니다.");
    res.status(201).json(honor);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 게임정보를 삭제하는 DELETE 요청
scoreRouter.delete("/:id", async (req, res, next) => {
  try {
    const index = req.params.id;
    console.log("🖐️ 해당 기록 데이터를 삭제합니다.");
    await scoreService.deleteScore(index);
    console.log("✔️ 기록 삭제 완료!");
    res.status(201).send("기록 삭제 완료");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

export { scoreRouter };
