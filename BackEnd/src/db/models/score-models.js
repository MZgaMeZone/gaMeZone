import mongoose from "mongoose";
import GameSchema from "../schemas/game-schema.js";
import ScoreSchema from "../schemas/score-schema.js";
import { nanoid } from "nanoid"; // npm install nanoid 로 라이브러리 설치해야 함
import dayjs from "dayjs"; // npm install dayjs 로 라이브러리 설치해야 함

const Game = mongoose.model("games", GameSchema);
const Score = mongoose.model("scores", ScoreSchema);

class ScoreModel {
  async findScoresByGame(id) {
    // 게임명으로 검색하여 모든 기록정보를 불러오기
    // 무한스크롤이나 페이지네이션을 구현해야 할 것임.
    const findScores = await Score.find({ gameId: id });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }

  async findScoresById(id) {
    // 유저아이디로 검색하여 달성한 모든 기록정보를 불러오기
    const findScores = await Score.find({ userId: id });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }
  async createScoreBoard(data) {
    // 새 기록을 저장하기
    const newScore = await Score.create(data);

    return newScore;
  }

  async calculateRanking(id, option) {
    // 해당 게임의 랭킹정보를 불러오기 : 랭킹정보의 기준 데이터 - 5판 평균점수
    // 기록 데이터는 프론트단에서 걸러서 와야함.(기준이 게임마다 다르기 때문)
    // option은 Average Score, High Score 중 어느 것을 랭킹 기준으로 할 지
    const findScores = await Score.find({ gameId: id });
    let nonOption = "default";
    if (option === "averageScore") {
      nonOption = "highScore";
    } else {
      nonOption = "averageScore";
    }
    // 랭킹등록 우선순위 : 1순위(option) 2순위(non-option) 3순위(달성시점)
    const ranking = [...findScores].sort((b, a) =>
      a[option] === b[option]
        ? a[nonOption] === b[nonOption]
          ? a[Date.parse(createAt)] - b[Date.parse(createAt)]
          : a[nonOption] - b[nonOption]
        : a[option] - b[option]
    );
    return ranking;
  }

  async deleteScore(id) {
    // 부정한 방법으로 달성한 기록을 말소하기 위한 운영자 기능
    try {
      const deleteData = await Score.deleteOne({ _id: id });
      return deleteData;
    } catch (e) {
      console.log(`[기록 삭제 실패] 입력한 id를 다시 확인해주세요`);
      throw new Error(e);
    }
  }
}

const scoreModel = new ScoreModel();
// // **Custom Database**
// // ----- New Game Data -----
// const score = {
//   gameId: "645d06e53dcefd63e6ce72a9",
//   userNickname: "고마오ㄱㅁㅇrad",
//   totalScores: [100, 100],
//   averageScore: 100,
//   highScore: 100,
// };
// scoreModel.createScoreBoard(score);
// // ----- Find GameData by Id -----
// const id = "645d06e53dcefd63e6ce72a9"
// scoreModel.findScoresByGame(id);

// // ----- Ranking -----
// const option = "average";
// const id = "645d06e53dcefd63e6ce72a9";
// scoreModel.calculateRanking(id, option);

export { scoreModel };
