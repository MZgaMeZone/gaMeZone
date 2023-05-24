import { Router } from "express";
import { profileService } from "../services/profile-service.js";
const profileRouter = Router();

//프로필이미지 등록
profileRouter.post("/:email", async (req, res, next) => {
  try {
    const { userIcon } = req.body;
    const email = req.params.email;
    console.log(email);
    console.log(userIcon);
    console.log("🖐️ 유저 프로필 사진을 등록합니다.");
    const newProfile = await profileService.uploadeProfile(userIcon, email);
    console.log("✔️ 유저 프로필 사진 등록이 완료되었습니다!");
    res.status(201).json(newProfile);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { profileRouter };
