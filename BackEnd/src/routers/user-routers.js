import { Router } from "express";
import jwt from "jsonwebtoken";
import { userService } from "../services/index.js";
import { loginRequired } from "../middlewares/login-required.js";
import { userChecker } from "../middlewares/userValidation.js";

//express의 Router를 통해 userRouter 생성
const userRouter = Router();

// 가입시 POST 요청에 대한 라우팅 , /register 이라는 경로로 요청 시
userRouter.post("/signup", userChecker.signUpJoi, async (req, res, next) => {
  try {
    //요청으로 전달된 body의 값들을 변수에 저장 !
    console.log("🖐️ Welcome!! 회원가입을 진행합니다.");
    const {
      name,
      email,
      password,
      address1,
      address2,
      // postalCode,
      phoneNumber,
      role,
    } = req.body;
    // userSerivce의 createUser 메소드를 통해 사용자를 생성
    const newUser = await userService.createUser({
      name,
      email,
      password,
      address1,
      address2,
      // postalCode,
      phoneNumber,
      role,
    });
    console.log("✔️ 가입정보 확인이 완료되었습니다.");
    // 생성된 사용자 정보를 json형태로 res에 전달.
    res.status(201).json(newUser);
    console.log("회원 가입 성공! 환영합니다.");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

//로그인
userRouter.post("/login", userChecker.loginJoi, async (req, res, next) => {
  console.log("로그인 시도 🌸");
  const { email, password } = req.body;
  try {
    const userToken = await userService.getUserToken(email, password);
    res.status(200).json(userToken);
    console.log("✔️ 로그인 성공!");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

//탈퇴
userRouter.delete("/", loginRequired, async (req, res, next) => {
  console.log("💧 회원 탈퇴를 진행합니다.");
  const token = req.headers["authorization"]?.split(" ")[1];
  // 토큰의 secret key와 발급할때의 secre_key 값 비교
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("✔️ 토큰 검증 완료. 계속해서 회원 탈퇴를 진행합니다.");
  //토큰에서 추출한 유저 아이디
  const userId = decodedToken.userId;
  try {
    await userService.deleteUser(userId);
    return res
      .status(200)
      .json({ result: "탈퇴되었습니다. 이용해주셔서 감사합니다." });
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

//업데이트
userRouter.patch("/", loginRequired, async (req, res, next) => {
  //req 헤더의 autho token
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json("토큰이 없습니다. 로그인 후 이용해주세요.");
  }
  console.log("🔄 유저 정보를 업데이트합니다...");
  const { password, address1, address2, phoneNumber } = req.body;

  const toUpdateInfo = {
    //password값이 있을 경우(true), password 속성: req.body에서 받은 password 변수 값 --> ex) {password : "myPassword1234"}
    //false인 경우 toUpdateInfo Object에 추가되지 않음.
    ...(password && { password }),
    ...(address1 && { address1 }),
    ...(address2 && { address2 }),
    // ...(postalCode && { postalCode }),
    ...(phoneNumber && { phoneNumber }),
  };

  console.log("🔎 토큰 확인 중...");
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✔️ 토큰 검증 완료. 유저 정보를 업데이트 합니다.");
    const updatedUser = await userService.updateUser(
      decodedToken.userId,
      toUpdateInfo
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// //유저 권한(role) 변경 - 추가기능으로 활용 예정
// userRouter.patch(
//   "/role-info",
//   userChecker.roleChangeJoi,
//   async (req, res, next) => {
//     try {
//       const token = req.headers["authorization"]?.split(" ")[1];
//       const { userId, role } = req.body;
//       console.log("🔎 총 관리자(super-admin) 권한을 확인합니다...");
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       const currentUserRole = decodedToken.role;

//       if (currentUserRole !== "super-admin") {
//         throw new Error("총관리자가 아닙니다.");
//       }
//       console.log("👑Super-admin Accepted👑");
//       const updatedRole = await userService.updateUser(userId, { role });
//       console.log("✔️ 유저 권한이 수정되었습니다.");
//       return res.status(201).json(updatedRole);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// // 전체 유저 조회 - 추가기능으로 활용 예정
// userRouter.get("/allUser", async (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   console.log("🔎 토큰 검증 중...");
//   const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   const currentUserRole = decodedToken.role;

//   if (currentUserRole !== "admin" || "super-admin") {
//     throw new Error("관리자가 아닙니다.");
//   }
//   try {
//     console.log("🔎 검증 완료! 모든 유저 리스트를 조회합니다...");
//     const allUser = await userService.getAllUser();
//     console.log("🖥️ 유저 정보 출력 중..");
//     return res.status(200).json(allUser);
//   } catch (err) {
//     console.log(`❌ ${err}`);
//     next(err);
//   }
// });

// 토큰 검증 후 로그인 유저 정보 조회
userRouter.get("/auth/verifyToken", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json("토큰이 없습니다. 로그인 후 이용해주세요.");
  }
  try {
    console.log("🔎 유저 정보를 조회합니다...");
    const userData = await userService.verifyToken(token);
    console.log("🖥️ 유저 정보 출력 중..");
    return res.status(200).json(userData);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

export { userRouter };
