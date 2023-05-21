import { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryName: {
      // 카테고리명
      type: String,
      required: true,
    },
  },
  {
    // 타임스탬프와 DB에서 사용할 컬렉션 이름 설정
    timestamps: true,
    collection: "categories",
  }
);

export default CategorySchema;
