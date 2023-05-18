import mongoose from "mongoose";

// .env 파일의 MONGODB_URL를 가져온다, 없을시 .env내 설정을 확인해야한다.
const DB_URL =
  process.env.DB_URL || "서버 주소가 없습니다. .env 내 설정을 확인해주세요.";

//mongoose를 사용하여 DB 연결
mongoose.connect(DB_URL);

//성공적으로 연결시 Connected 성공! 콘솔 출력
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected 성공! 🔥");
});

//연결 실패 시 Connected 실패! 콘솔 출력
mongoose.connection.on("error", () => {
  console.log("MongoDB Connected 실패! 😓");
});

//models의 user-model.js에서 export하는 것을 전부다 export한다.
export * from "./models/user-models.js";
export * from "./models/game-models.js";
export * from "./models/score-models.js";
export * from "./models/post-models.js";
