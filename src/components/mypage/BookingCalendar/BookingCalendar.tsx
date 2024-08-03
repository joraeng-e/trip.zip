import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getLocalDateString,
} from '@/libs/utils/dateUtils';

import { Booking } from '../ReservationStatus';

type CalendarProps = {
  currentYear: number;
  currentMonth: number;
  bookings: { date: string; info: string }[];
  days: string[];
};

type DateObject = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isScheduled: boolean;
  bookingInfo?: string;
};

export default function Calendar({
  currentYear,
  currentMonth,
  days,
  bookings,
}: CalendarProps) {
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
    const booking = bookings.find((booking) => booking.date === dateString);
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
    <div className="grid grid-cols-7 gap-2 border-1 border-custom-gray-400">
      {days.map((day) => (
        <div
          key={day}
          className="flex h-43 items-center border-b-1 border-custom-gray-400 pl-6 text-13"
        >
          <span>{day}</span>
        </div>
      ))}
      {calendar.map((week, weekIndex) =>
        week.map((dateObject, dateIndex) => {
          const dateString = getLocalDateString(dateObject.date);
          const bookingsOnDate = bookingMap.get(dateString) || [];
          return (
            <div
              key={`${weekIndex}-${dateIndex}`}
              className={`h-154 w-full border-b-1 border-custom-gray-400`}
            >
              <div
                className={`flex flex-col pl-6 ${dateObject.isCurrentMonth ? '' : 'opacity-30'}`}
              >
                <span className="text-17 font-medium">{dateObject.day}</span>
                <span className="text-7">{dateString}</span>
                {bookingsOnDate.map((booking, bookingIndex) => (
                  <div key={bookingIndex} className="flex flex-col text-10">
                    {booking.info}
                  </div>
                ))}
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
}
