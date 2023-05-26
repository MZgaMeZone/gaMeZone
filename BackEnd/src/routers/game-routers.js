import { Router } from "express";
import jwt from "jsonwebtoken";
import { gameService } from "../services/index.js";
import { loginRequired } from "../middlewares/login-required.js";
// import { userChecker } from "../middlewares/userValidation.js";

const gameRouter = Router();

// 모든 게임정보를 가져오는 GET 요청
gameRouter.get("/", async (req, res, next) => {
  try {
    // console.log("🖐️ 모든 게임정보를 출력합니다.");
    const gameList = await gameService.findAllGames();
    // console.log("✔️ 게임정보 출력 완료!");
    res.status(201).json(gameList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

gameRouter.get("/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    console.group("😻 게임 Id에 해당하는 게임 정보를 출력합니다.");
    const gameData = await gameService.findGame(gameId);
    console.log("✔️ 게임 정보 출력 완료!");
    res.status(201).json(gameData);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 새 게임정보를 등록하는 POST 요청
gameRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    console.log("🖐️ 새 게임을 등록합니다.");
    const newGame = await gameService.createNewGame(data);
    console.log("✔️ 게임 등록이 완료되었습니다!");
    res.status(201).json(newGame);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 게임정보를 수정하는 PATCH 요청
gameRouter.patch("/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const data = req.body;
    console.log("🖐️ 게임정보를 수정합니다.");
    const updateGame = await gameService.updateGame(gameId, data);
    console.log("✔️ 게임정보 수정이 완료되었습니다!");
    res.status(201).json(updateGame);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 게임정보를 삭제하는 DELETE 요청
gameRouter.delete("/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    console.log("🖐️ 등록된 게임을 삭제합니다.");
    await gameService.deleteGame(gameId);
    console.log("✔️ 게임정보 삭제 완료!");
    res.status(201).send("게임정보 삭제 완료");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 카테고리명으로 검색해서 게임정보를 불러오는 GET요청
gameRouter.get("/categories/:name", async (req, res, next) => {
  try {
    const category = req.params.name;
    // console.log("🖐️ 해당 카테고리명을 가진 게임을 검색합니다.");
    const gameList = await gameService.findGamesByCategory(category);
    // console.log("✔️ 게임정보 출력 완료!");
    res.status(201).json(gameList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

export { gameRouter };
