import useClickOutside from '@/hooks/useClickOutside';
import {
  getLocalDateString,
  isPastDate,
  removeTime,
} from '@/libs/utils/dateUtils';
import { GetMyActivitiesReservationDashboardResponse } from '@trip.zip-api';
import { useRef, useState } from 'react';

import BookingDetailModal from './BookingDetailModal';
import StatusTag from './BookingStatusTag';
import { generateCalendar } from './generateCalendar';

type CalendarProps = {
  currentYear: number;
  currentMonth: number;
  days: string[];
  monthlyData: GetMyActivitiesReservationDashboardResponse;
  activityId: number;
  onRefresh: () => void;
};

export default function Calendar({
  currentYear,
  currentMonth,
  days,
  monthlyData,
  activityId,
  onRefresh,
}: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const today = removeTime(new Date());

  // 날짜 별 예약정보 리스트업
  const bookingMap = new Map<string, Record<string, string>>();

  monthlyData.forEach((booking) => {
    const transformedReservations = {
      completed: String(booking.reservations.completed),
      confirmed: String(booking.reservations.confirmed),
      pending: String(booking.reservations.pending),
    };

    bookingMap.set(booking.date, transformedReservations);
  });

  // 캘린더 생성
  const calendar = generateCalendar({
    currentYear,
    currentMonth,
    dataMap: bookingMap,
  });

  const handleDateClick = (date: string) => {
    // 예약 정보가 있을 때만 모달 열기
    if (bookingMap.has(date)) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate('');
    onRefresh();
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, handleCloseModal);

  return (
    <div
      className={`grid grid-cols-7 gap-2 rounded-lg border-1 ${isModalOpen ? 'border-custom-gray-100' : 'border-custom-gray-400'}`}
    >
      {days.map((day) => (
        <div
          key={day}
          className="flex h-43 items-center border-b-1 border-custom-gray-400 pl-6 text-13 md:text-17"
        >
          <span>{day}</span>
        </div>
      ))}
      {calendar.map((week, weekIndex) =>
        week.map((dateObject, dateIndex) => {
          const alertClass = isPastDate(dateObject.date, today)
            ? 'bg-custom-gray-800'
            : 'bg-green-400';
          const dateString = getLocalDateString(dateObject.date);
          const hasBooking = !!dateObject.scheduleInfo;
          return (
            <button
              key={`${weekIndex}-${dateIndex}`}
              className={`flex h-120 w-full flex-col justify-between border-t-1 border-custom-gray-400 pb-6 pl-6 md:h-154 ${
                hasBooking ? '' : 'cursor-default opacity-50'
              } ${dateString === getLocalDateString(today) ? 'bg-custom-gray-200 dark:bg-custom-green-200' : ''}`}
              type="button"
              onClick={() => handleDateClick(dateString)}
              disabled={!hasBooking}
            >
              <div
                className={`flex flex-col ${dateObject.isCurrentMonth ? '' : 'opacity-30'}`}
              >
                <span className="text-17 font-medium md:text-21">
                  {dateObject.day}
                </span>
                {dateObject.scheduleInfo && (
                  <div className={`${alertClass} size-8 rounded-full`} />
                )}
              </div>
              {dateObject.scheduleInfo && (
                <StatusTag bookingInfo={dateObject.scheduleInfo} />
              )}
            </button>
          );
        }),
      )}
      {selectedDate && (
        <div className="flex-center absolute left-0 top-0 flex h-full w-full backdrop-blur-sm">
          <div ref={modalRef}>
            <BookingDetailModal
              activityId={activityId}
              date={selectedDate}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
