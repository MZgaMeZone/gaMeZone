import "dotenv/config";
import { app } from "./src/app.js";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`서버를 시작하였습니다. Port :: ${PORT} 🍷`);
});
