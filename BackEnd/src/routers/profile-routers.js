import { Router } from "express";
import { profileService } from "../services/profile-service.js";
import { imageUploadHelper } from "../middlewares/multer.js";
const profileRouter = Router();

//프로필이미지 등록
profileRouter.post(
  "/:email",
  imageUploadHelper.single("img"),
  async (req, res, next) => {
    try {
      const { userIcon } = req.body;
      const { email } = req.params;
      console.log(email);
      console.log(userIcon);
      const imgpath = req.file.path.replace(/\\/g, "/");
      console.log("🖐️ 유저 프로필 사진을 등록합니다.");
      const newProfile = await profileService.uploadeProfile(imgpath, email);
      console.log("✔️ 유저 프로필 사진 등록이 완료되었습니다!");
      res.status(201).json(newProfile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export { profileRouter };
