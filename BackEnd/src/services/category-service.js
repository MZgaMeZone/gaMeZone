import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { categoryModel } from "../db/index.js";

class CategoryService {
  constructor() {
    this.categoryModel = categoryModel;
  }
  //POST
  async createNewCategory(data) {
    return await categoryModel.createNewCategory(data);
  }
  //GET
  async findAllCategory() {
    return await categoryModel.findAllCategory();
  }
  //PATCH
  async updateCategory(id, data) {
    return await categoryModel.updateCategory(id, data);
  }
  //DELETE
  async deleteCategory(id) {
    return await categoryModel.deleteCategory(id);
  }
}

const categoryService = new CategoryService(categoryModel);
export { categoryService };
