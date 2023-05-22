import mongoose from "mongoose";
import CategorySchema from "../schemas/category-schema.js";

const Category = mongoose.model("categories", CategorySchema);

class CategoryModel {
  async createNewCategory(data) {
    // 새 카테고리 추가
    try {
      const existingCategory = await Category.findOne({
        categoryName: data.categoryName,
      });
      if (existingCategory) {
        console.log("이미 존재하는 카테고리입니다.");
        throw new Error("이미 존재하는 카테고리입니다.");
      }
      const newCategory = await Category.create(data);
      return newCategory;
    } catch (e) {
      console.log("이미 존재하는 카테고리입니다.");
      throw new Error(e);
    }
  }
  async updateCategory(id, data) {
    try {
      // 기존 카테고리 조회
      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        console.log("존재하지 않는 카테고리입니다.");
        throw new Error("존재하지 않는 카테고리입니다.");
      }

      // 카테고리명 수정
      existingCategory.categoryName = data.categoryName;
      const updatedCategory = await existingCategory.save();
      return updatedCategory;
    } catch (error) {
      console.log("카테고리 수정 오류:", error);
      throw new Error("카테고리 수정 중 오류가 발생했습니다.");
    }
  }

  async deleteCategory(id) {
    // 카테고리 삭제
    try {
      const existingCategory = await Category.findOne({
        _id: id,
      });
      if (!existingCategory) {
        console.log("존재하지 않는 카테고리입니다.");
        throw new Error("존재하지 않는 카테고리입니다.");
      }
      const deleteCategory = await Category.deleteOne({ _id: id });
      return deleteCategory;
    } catch (e) {
      console.log("존재하지 않는 카테고리입니다.");
      throw new Error(e);
    }
  }
  async findAllCategory() {
    // 모든 카테고리 검색
    const allCategory = await Category.find({});
    return allCategory;
  }
}

const categoryModel = new CategoryModel();
export { categoryModel };
