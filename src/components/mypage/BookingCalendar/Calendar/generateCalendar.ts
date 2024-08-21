import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getLocalDateString,
} from '@/libs/utils/dateUtils';

type DateObject = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  scheduleInfo?: Record<string, string>;
};

type DataMap = Map<string, Record<string, string>>;

type generateCalendarProps = {
  currentYear: number;
  currentMonth: number;
  dataMap: DataMap;
};

export const generateCalendar = ({
  currentYear,
  currentMonth,
  dataMap,
}: generateCalendarProps) => {
  const calendar: DateObject[][] = [];
  let week: DateObject[] = [];

  // 현재 달의 날짜 계산
  const firstDayOfCurrentMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  // 이전 달의 날짜 계산
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  // 다음 달의 날짜 계산
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  // 이전 달 날짜 채우기
  for (let i = firstDayOfCurrentMonth - 1; i >= 0; i--) {
    const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
    const dateString = getLocalDateString(date);
    week.push({
      date,
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      scheduleInfo: dataMap.get(dateString),
    });
  }

  // 현재 월 날짜 채우기
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = getLocalDateString(date);
    week.push({
      date,
      day,
      isCurrentMonth: true,
      scheduleInfo: dataMap.get(dateString),
    });
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  // 다음 달 날짜 채우기
  let nextMonthDay = 1;
  while (week.length < 7) {
    const date = new Date(nextYear, nextMonth, nextMonthDay);
    const dateString = getLocalDateString(date);
    week.push({
      date,
      day: nextMonthDay,
      isCurrentMonth: false,
      scheduleInfo: dataMap.get(dateString),
    });
    nextMonthDay++;
  }
  calendar.push(week);

  // 나머지 빈 줄 채우기
  while (calendar.length < 6) {
    week = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date(nextYear, nextMonth, nextMonthDay);
      const dateString = getLocalDateString(date);
      week.push({
        date,
        day: nextMonthDay,
        isCurrentMonth: false,
        scheduleInfo: dataMap.get(dateString),
      });
      nextMonthDay++;
    }
    calendar.push(week);
  }

  return calendar;
};
