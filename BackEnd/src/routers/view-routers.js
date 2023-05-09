import { Router } from "express";
import { imageUploadHelper } from "../middlewares/multer.js";
import mongoose from "mongoose";
import { ImageSchema } from "../db/schemas/blank-schema.js";

const ImageBox = mongoose.model("image", ImageSchema);
const viewsRouter = Router();
viewsRouter.get("/", (req, res) => {
  res.send("root page");
  console.log(
    "메인 페이지 입니다. 현재 백엔드 서버가 정상적으로 작동하고 있습니다."
  );
});

//-----------------작동테스트용 코드-------------------//
viewsRouter.post(
  "/imgtest",
  imageUploadHelper.single("img"),
  async (req, res, next) => {
    try {
      // 파일이 업로드 되었는지 확인
      if (!req.file) {
        throw new Error("파일을 업로드해주세요.");
      }
      const imgpath = req.file.path.replace(/\\/g, "/");
      console.log("🔄 새로운 이미지를 등록하는 중...");
      // ImageBox 모델로 이미지 경로를 저장
      const newImage = await ImageBox.create({ imgUrl: imgpath });
      res.status(201).json(newImage);
      console.log(`이미지가 ${imgpath}에 저장되었습니다.`);
    } catch (error) {
      console.error("뭔가안됨");
      next(error);
    }
  }
);
//-----------------------------------------------------//

export { viewsRouter };
