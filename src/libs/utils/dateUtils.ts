/**
 * @param year - 연도
 * @param month - 월 index, 0 ~ 11 (Jan ~ Dec)
 * @returns 해당 월의 일수
 *
 * @example
 * ```
 * new Date(year, month + 1, 0).getDate();
 * ```
 * 인수로 입력한 "month + 1(다음달)의 0일"의 날짜를 가져옴
 * => 인수로 입력한 달의 마지막 날짜(해당 달의 총 일수)
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * @param year - 연도
 * @param month - 월
 * @returns 해당 월 첫번째 날짜의 요일
 * 0 ~ 6(일 ~ 토)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};

/**
 * @param year - 연도
 * @param month - 월
 * @returns 해당 월 마지막 날짜의 요일
 * 0 ~ 6(일 ~ 토)
 */
export const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDay();
};
