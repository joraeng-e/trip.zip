import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from '@/libs/utils/dateUtils';
import { useState } from 'react';

type CalendarProps = {
  year: number;
  month: number;
};

type CalendarDay = {
  day: number;
  isCurrentMonth: boolean;
};

export default function Calendar({ year, month }: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfCurrentMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const lastDayOfCurrentMonth = getLastDayOfMonth(currentYear, currentMonth);

  const generateCalendar = () => {
    const calendar: CalendarDay[][] = [];
    let week: CalendarDay[] = [];

    const daysInPrevMonth =
      currentMonth === 0
        ? getDaysInMonth(currentYear - 1, 11)
        : getDaysInMonth(currentYear, currentMonth - 1);

    // 이전 달 날짜 채우기
    for (let i = firstDayOfCurrentMonth - 1; i >= 0; i--) {
      week.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
      });
    }

    // 현재 월 날짜 채우기
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      week.push({ day, isCurrentMonth: true });
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // 다음 달 날짜 채우기
    let nextMonthDay = 1;
    while (week.length < 7) {
      week.push({
        day: nextMonthDay++,
        isCurrentMonth: false,
      });
    }
    calendar.push(week);

    // 나머지 빈 줄 채우기
    while (calendar.length < 6) {
      week = [];
      for (let i = 1; i <= 7; i++) {
        week.push({ day: nextMonthDay, isCurrentMonth: false });
        nextMonthDay++;
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <div className="grid grid-cols-7 gap-2">
      {calendar.map((week, weekIndex) =>
        week.map((calendarDay, dayIndex) => (
          <div
            key={`${weekIndex}-${dayIndex}`}
            className={`flex h-full w-full text-20 ${calendarDay.isCurrentMonth ? '' : 'opacity-40'}`}
          >
            {calendarDay.day}
          </div>
        )),
      )}
    </div>
  );
}
