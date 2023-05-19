import { Router } from "express";
import jwt from "jsonwebtoken";
import { categoryService } from "../services/index.js";
import { loginRequired } from "../middlewares/login-required.js";
// import { userChecker } from "../middlewares/userValidation.js";

const categoryRouter = Router();

// 새 카테고리를 등록하는 POST 요청
categoryRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    console.log("🖐️ 새 카테고리를 등록합니다.");
    const newCategory = await categoryService.createNewCategory(data);
    console.log("✔️ 카테고리 등록이 완료되었습니다!");
    res.status(201).json(newCategory);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 모든 카테고리를 가져오는 GET 요청
categoryRouter.get("/", async (req, res, next) => {
  try {
    console.log("🖐️ 모든 카테고리 정보를 출력합니다.");
    const categoryList = await categoryService.findAllCategory();
    console.log("✔️ 카테고리정보 출력 완료!");
    res.status(201).json(categoryList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 카테고리를 수정하는 PATCH 요청
categoryRouter.patch("/:id", async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    console.log("🖐️ 카테고리명을 수정합니다.");
    const updateCategory = await categoryService.updateCategory(
      categoryId,
      data
    );
    console.log("✔️ 카테고리 이름이 수정되었습니다!");
    res.status(201).json(updateCategory);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 카테고리를 삭제하는 DELETE 요청
categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    console.log("🖐️ 카테고리를 삭제합니다.");
    await categoryService.deleteCategory(categoryId);
    console.log("✔️ 카테고리 삭제 완료!");
    res.status(201).send("카테고리 삭제 완료");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

export { categoryRouter };
