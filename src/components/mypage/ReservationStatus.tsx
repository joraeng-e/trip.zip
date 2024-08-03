import { getMyActivities } from '@/libs/api/myActivities';
import { DoubleArrowNext, DoubleArrowPrev } from '@/libs/utils/Icon';
import React, { useState } from 'react';

import Calendar from './BookingCalendar/BookingCalendar';

export type Booking = {
  date: string; // 'YYYY-MM-DD'
  info: string; // 예약 정보
};

export default function ReservationStatus() {
  const myActivities = getMyActivities();
  //mock
  const bookings: Booking[] = [
    { date: '2024-07-30', info: 'Meeting' },
    { date: '2024-08-10', info: 'Surfing' },
    { date: '2024-08-10', info: 'Meeting' },
    { date: '2024-08-15', info: 'Hospital' },
    { date: '2024-09-02', info: 'Birthday' },
  ];

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const today = new Date();
  const yearNow = today.getFullYear();
  const monthNow = today.getMonth();

  const [currentYear, setCurrentYear] = useState(yearNow);
  const [currentMonth, setCurrentMonth] = useState(monthNow);

  const handleMonthPrev = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11); // 12월로 설정
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleMonthNext = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0); // 1월로 설정
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <>
      <div className="flex h-full w-full min-w-342 flex-col gap-24">
        <section className="flex flex-col gap-32">
          <h2 className="text-32 font-bold">예약 현황</h2>
          <select className="h-56 w-full rounded-md border-1 border-custom-gray-700 outline-none">
            <option value="burger">햄버거 먹기</option>
            <option value="beef">소고기 먹기</option>
            <option value="peperoni">페퍼로니 피자 먹기</option>
            <option value="chicken">치킨 먹기</option>
          </select>
        </section>
      </div>
      <div className="mb-100 mt-24 flex flex-col gap-17">
        {/* control bar */}
        <div className="flex justify-center gap-10">
          <button type="button" onClick={handleMonthPrev}>
            <DoubleArrowPrev aria-label="이전 달" />
          </button>
          <button type="button">{currentYear}년</button>
          <button type="button">{currentMonth + 1}월</button>
          <button type="button" onClick={handleMonthNext}>
            <DoubleArrowNext aria-label="다음 달" />
          </button>
        </div>
        <div>
          <Calendar
            currentYear={currentYear}
            currentMonth={currentMonth}
            days={days}
            bookings={bookings}
          />
        </div>
      </div>
    </>
  );
}
