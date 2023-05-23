import { model } from "mongoose";
import UserSchema from "../schemas/user-schema.js";

// UserSchema를 기준으로 User라는 모델 생성
const User = model("User", UserSchema);

export class UserModel {
  // 로그인
  async findById(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // 회원가입
  async createUser(userInfo) {
    try {
      const newUser = await User.create(userInfo);
      return newUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  // 이메일 조회
  async findByEmail(email) {
    const userData = await User.findOne(
      { email },
      { _id: 0, password: 0, status: 0, createdAt: 0, updatedAt: 0 }
    );
    return userData;
  }

  // 닉네임 조회
  async findByNickname(nickname) {
    const userData = await User.findOne(
      { nickname },
      { _id: 0, password: 0, status: 0, createdAt: 0, updatedAt: 0 }
    );
    return userData;
  }

  // 탈퇴
  async deleteUser(userId) {
    try {
      await User.findOneAndUpdate({ email: userId }, { status: 0 });
    } catch (err) {
      throw new Error(err);
    }
  }

  // 유저 정보 수정
  async updateUser(userId, toUpdateInfo) {
    try {
      // returnOriginal 옵션을 false로 설정되면 업데이트된 사용자 리턴
      const updatedUser = await User.findOneAndUpdate(
        { email: userId },
        toUpdateInfo,
        {
          returnOriginal: false,
        }
      );
      return updatedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  //전체 유저 정보 불러오기
  async getAllUsers() {
    try {
      const allUsers = await User.find(
        {},
        { email: 1, nickname: 1, role: 1 }
      ).lean();
      return allUsers;
    } catch (err) {
      throw new Error(err);
    }
  }
}
export const userModel = new UserModel();
