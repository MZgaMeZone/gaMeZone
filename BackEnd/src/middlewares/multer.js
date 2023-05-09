import multer from "multer";
import path from "path";
// 출처 https://juni-official.tistory.com/195
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // 파일 저장 경로 : 프론트와 협의하여 결정
  },
  // 폴더 안에 저장되는 파일 명을 결정하는 데 사용
  filename: function (req, file, cb) {
    // input type의 name 값
    const name = file.fieldname;
    // 변수명 ex) .png, .jpg 등이 저장됨
    const ext = path.extname(file.originalname);
    // 파일명 설정
    const filename = name + "-" + Date.now() + ext;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];

  if (
    fileType == "jpg" ||
    fileType == "png" ||
    fileType == "jpeg" ||
    fileType == "gif" ||
    fileType == "webp"
  ) {
    req.fileValidationError = null;
    cb(null, true);
  } else {
    req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
    cb(null, false);
  }
};

const imageUploadHelper = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 용량제한 : 10MB
  fileFilter: fileFilter,
});

export { imageUploadHelper };
