import { Schema } from "mongoose";
// 이미지 입력 테스트를 위한 test용 Schema
const ImageSchema = new Schema({
  imgUrl: {
    type: String,
    required: true,
  },
});

export { ImageSchema };
