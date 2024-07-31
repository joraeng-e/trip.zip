import React from 'react';

import Calendar from './BookingCalendar/BookingCalendar';

export default function ReservationStatus() {
  return (
    <div className="flex h-full w-full min-w-342 flex-col gap-24 border-1 border-pink-600">
      <section className="flex flex-col gap-32">
        <h2 className="text-32 font-bold">예약 현황</h2>
        <select className="h-56 w-full rounded-md border-1 border-custom-gray-700 outline-none">
          <option value="burger">햄버거 먹기</option>
          <option value="beef">소고기 먹기</option>
          <option value="peperoni">페퍼로니 피자 먹기</option>
          <option value="chicken">치킨 먹기</option>
        </select>
      </section>
      <Calendar />
    </div>
  );
}
