import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getLocalDateString,
} from '@/libs/utils/dateUtils';
import { useState } from 'react';

import { Booking } from '../ReservationStatus';

type CalendarProps = {
  year: number;
  month: number;
  bookings: { date: string; info: string }[];
};

type DateObject = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isScheduled: boolean;
  bookingInfo?: string;
};

export default function Calendar({ year, month, bookings }: CalendarProps) {
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month - 1);
  // parameter로 전달된 값이 1일 때 1월을 출력하기 위함

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

  // 날짜 예약 여부 확인 함수
  const isScheduledDate = (
    date: Date,
  ): { isScheduled: boolean; info?: string } => {
    // localTime 기준 날짜 변환 to "YYYY-MM-DD"
    const dateString = getLocalDateString(date);
    console.log(`Checking dateString: ${dateString}`);
    const booking = bookings.find((booking) => booking.date === dateString);
    console.log(`Booking found: ${booking}`); //
    return booking
      ? { isScheduled: true, info: booking.info }
      : { isScheduled: false };
  };

  // 캘린더 생성 함수
  const generateCalendar = () => {
    const calendar: DateObject[][] = [];
    let week: DateObject[] = [];

    // 이전 달 날짜 채우기
    for (let i = firstDayOfCurrentMonth - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      const { isScheduled, info } = isScheduledDate(date);
      week.push({
        date,
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isScheduled,
        bookingInfo: info,
      });
    }

    // 현재 월 날짜 채우기
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const { isScheduled, info } = isScheduledDate(date);
      week.push({
        date,
        day,
        isCurrentMonth: true,
        isScheduled,
        bookingInfo: info,
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
      const { isScheduled, info } = isScheduledDate(date);
      week.push({
        date,
        day: nextMonthDay,
        isCurrentMonth: false,
        isScheduled,
        bookingInfo: info,
      });
      nextMonthDay++;
    }
    calendar.push(week);

    // 나머지 빈 줄 채우기
    while (calendar.length < 6) {
      week = [];
      for (let i = 1; i <= 7; i++) {
        const date = new Date(nextYear, nextMonth, nextMonthDay);
        const { isScheduled, info } = isScheduledDate(date);
        week.push({
          date,
          day: nextMonthDay,
          isCurrentMonth: false,
          isScheduled,
          bookingInfo: info,
        });
        nextMonthDay++;
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar();

  // bookings를 DateObject에 매핑
  const bookingMap = new Map<string, Booking[]>();
  bookings.forEach((booking) => {
    const dateString = booking.date;
    if (!bookingMap.has(dateString)) {
      bookingMap.set(dateString, []);
    }
    bookingMap.get(dateString)?.push(booking);
  });

  return (
    <div className="grid grid-cols-7 gap-2">
      {calendar.map((week, weekIndex) =>
        week.map((dateObject, dateIndex) => {
          const dateString = getLocalDateString(dateObject.date);
          const bookingsOnDate = bookingMap.get(dateString) || [];
          return (
            <div
              key={`${weekIndex}-${dateIndex}`}
              className={`flex h-100 w-full flex-col text-20 ${dateObject.isCurrentMonth ? '' : 'opacity-40'}`}
            >
              <span>{dateObject.day}</span>
              <span className="text-10">{dateString}</span>
              {bookingsOnDate.map((booking, bookingIndex) => (
                <div key={bookingIndex} className="flex flex-col text-10">
                  {booking.info}
                </div>
              ))}
            </div>
          );
        }),
      )}
    </div>
  );
}
