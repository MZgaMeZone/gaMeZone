import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 시간 데이터 변경 함수
export function dateFormatter(dateData: string, format: string, local = 'ko') {
  const date = dayjs(dateData).locale(local).format(format);
  return date;
}
