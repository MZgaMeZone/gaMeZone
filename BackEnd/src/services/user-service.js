import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db/index.js";

class UserService {
  // 마지막 코드에서 클래스 생성 시 userModel을 인자로 받아옴
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 회원가입 email 중복 확인
  async emailDuplicateCheck(email) {
    const emailCheck = await this.userModel.findByEmail(email);

    if (emailCheck) {
      return { success: false };
    }
    return { success: true };
  }

  // 회원가입 nickname 중복 확인
  async nicknameDuplicateCheck(nickname) {
    const nicknameCheck = await this.userModel.findByNickname(nickname);

    if (nicknameCheck) {
      return { success: false };
    }
    return { success: true };
  }

  // 회원가입
  async createUser(info) {
    const { email, nickname, password, role } = info;

    const usingIdCheck = await this.userModel.findById(email);

    // 가입된 이메일 확인
    if (usingIdCheck) {
      console.log(
        "[회원가입 실패] 이미 사용중인 이메일입니다. 다시 입력해주세요."
      );
      return;
    }

    // 해시 함수를 10번 반복, 소금을 10번 뿌린 해쉬포테이토
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = {
      email,
      nickname,
      password: hashedPassword,
      role,
    };

    //db 에 유저 정보생성
    const newUser = await this.userModel.createUser(newUserInfo);

    return newUser;
  }

  // 로그인
  async authenticateUser(email, password) {
    const userData = await this.userModel.findById(email);
    const hashedUserPassword = userData.password;
    const comparePassword = await bcrypt.compare(password, hashedUserPassword);

    if (userData && comparePassword) {
      // 비밀번호 일치시 JWT 토큰 생성
      const secretKey = process.env.JWT_SECRET_KEY;

      // email과 권한을  jwt페이로드에 포함시키고 , 서명키에 secretKey전달 , 토큰의 유효시간은 1시간
      const userToken = jwt.sign(
        { email: userData.email, role: userData.role },
        secretKey,
        { expiresIn: "1h" } //토큰 유효시간 1시간 설정
      );

      if (userData.role === "super-admin") {
        console.log("✨ 총관리자 로그인 성공! ✨");
        return { userToken };
      }
      if (userData.role === "admin") {
        console.log("✨ 관리자 로그인 성공! ✨");
        return { userToken };
      }
      return { userToken };
    }

    // if (userData.status === 0) {
    //   console.log("[로그인 실패] 탈퇴한 회원입니다.");
    //   return;
    // }

    // 보안상 비밀번호만 틀렸다고 표시하지않는게 좋다고 알고있어요.
    // 비밀번호 일치하지 않을시
    console.log("[로그인 실패] 아이디 또는 비밀번호가 일치하지 않습니다.");
    return;
  }

  // 회원 탈퇴
  async deleteUser(email) {
    try {
      await this.userModel.deleteUser(email);
    } catch (err) {
      throw new Error(err);
    }
  }

  // 회원 정보 업데이트
  async updateNickname(email, newNickname) {
    const updatedNickname = await this.userModel.updateNickname(
      email,
      newNickname
    );
    return updatedNickname;
  }

  // // 회원 정보 업데이트
  // async updateNickname(email, toUpdateInfo) {
  //   // 사용자가 입력한 바꾸고싶은 비밀번호
  //   const { password } = toUpdateInfo;

  //   // 변경할 비밀번호가 있을 시
  //   if (password) {
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     toUpdateInfo.password = hashedPassword;
  //   }

  //   const updatedUser = await this.userModel.updateUser(email, toUpdateInfo);
  //   return updatedUser;
  // }

  // 전체 유저 정보 조회
  async getAllUsers() {
    const result = await this.userModel.getAllUsers();
    return result;
  }

  // 토큰 검사 후 유저 정보 리턴
  async verifyToken(userToken) {
    const token = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    if (!token) {
      console.log("토큰이 유효하지않거나 ID를 찾을 수 없습니다.");
      return;
    }
    const userData = await this.userModel.findByEmail(token.email);
    return userData;
  }
}

const userService = new UserService(userModel);
export { userService };
