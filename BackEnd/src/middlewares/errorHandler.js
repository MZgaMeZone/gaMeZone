function errorHandler(err, req, res, next) {
  // 에러를 처리하고 클라이언트에게 응답을 보내는 코드
  const statusCode = err.statusCode || 500;
  const message = `⚠️ ${err.message}` || "❌  Internal Server Error";
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
}

export default errorHandler;
