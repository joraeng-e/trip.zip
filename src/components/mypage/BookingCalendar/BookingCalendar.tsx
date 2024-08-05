import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getLocalDateString,
} from '@/libs/utils/dateUtils';
import { GetMyActivitiesReservationDashboardResponse } from '@trip.zip-api';

type CalendarProps = {
  currentYear: number;
  currentMonth: number;
  days: string[];
  monthlyData: GetMyActivitiesReservationDashboardResponse;
};

type DateObject = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  bookingInfo?: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

export default function Calendar({
  currentYear,
  currentMonth,
  days,
  monthlyData,
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

  // 날짜 별 예약정보 리스트업
  const bookingMap = new Map<
    string,
    { completed: number; confirmed: number; pending: number }
  >();
  monthlyData.forEach((booking) => {
    bookingMap.set(booking.date, booking.reservations);
  });

  // 캘린더 생성 함수
  const generateCalendar = () => {
    const calendar: DateObject[][] = [];
    let week: DateObject[] = [];

    // 이전 달 날짜 채우기
    for (let i = firstDayOfCurrentMonth - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      const dateString = getLocalDateString(date);
      week.push({
        date,
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        bookingInfo: bookingMap.get(dateString),
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
        bookingInfo: bookingMap.get(dateString),
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
        bookingInfo: bookingMap.get(dateString),
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
          bookingInfo: bookingMap.get(dateString),
        });
        nextMonthDay++;
      }
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar();

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
                {dateObject.bookingInfo && (
                  <div className="flex flex-col text-10">
                    <span>완료: {dateObject.bookingInfo.completed}</span>
                    <span>확인됨: {dateObject.bookingInfo.confirmed}</span>
                    <span>대기 중: {dateObject.bookingInfo.pending}</span>
                  </div>
                )}
              </div>
            </div>
          );
        }),
      )}
    </div>
  );
}
