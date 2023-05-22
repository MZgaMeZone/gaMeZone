import React from "react";

// 모든 게임에서 사용할 시간 출력 함수.  2023-05-09 11:39:27:619 이런 형태로 출력해줌.
function Now(now: Date) {
  //   const now = new Date(); // 현재 날짜와 시간 정보를 가진 Date 객체 생성
  const year = now.getFullYear(); // 년도
  const month = now.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
  const date = now.getDate(); // 일
  const hours = now.getHours(); // 시
  const minutes = now.getMinutes(); // 분
  const seconds = now.getSeconds(); // 초
  const milliseconds = now.getMilliseconds(); // 밀리초

  const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}`;
  const timeString = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${milliseconds}`;

  return `${dateString} ${timeString}`;
}

export default Now;
