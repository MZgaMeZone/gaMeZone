import { model } from 'mongoose';
import UserSchema from '../schemas/user-schema.js';

// UserSchema를 기준으로 User라는 모델 생성
const User = model('User', UserSchema);

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
      console.log('유저 모델');
      await User.findOneAndDelete({ email: userId }, { status: 0 }); //민영>>findOneAndDelete로 해야되는데 findOneAndUpdate로 넣어져있길래 수정했엉
    } catch (err) {
      throw new Error(err);
    }
  }

  // 유저 닉네임 수정
  async updateNickname(email, nickname) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { nickname } },
        { new: true }
      );
      return updatedUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  // 유저 비밀번호 수정
  async updatePassword(email, password) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { password } },
        { new: true }
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
        { email: 1, nickname: 1, role: 1, userIcon: 1 }
      ).lean();
      return allUsers;
    } catch (err) {
      throw new Error(err);
    }
  }
  async searchUser(nickname) {
    try {
      const searchUser = await User.find({
        nickname: { $regex: new RegExp(`${nickname}`, 'i') },
      });
      if (searchUser.length < 1) {
        console.log(`저장된 기록이 없습니다.`);
      }
      return searchUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}
export const userModel = new UserModel();
