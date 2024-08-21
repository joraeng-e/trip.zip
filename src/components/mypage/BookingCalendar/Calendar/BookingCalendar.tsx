import useClickOutside from '@/hooks/useClickOutside';
import {
  getLocalDateString,
  isPastDate,
  removeTime,
} from '@/libs/utils/dateUtils';
import { ReactNode, useRef, useState } from 'react';

import BookingDetailModal from '../BookingDetailModal.tsx/BookingDetailModal';
import StatusTag from './BookingStatusTag';
import ControlBar from './ControlBar';
import { generateCalendar } from './generateCalendar';

type CalendarProps = {
  year: number;
  month: number;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  days: string[];
  dataMap: Map<string, Record<string, string>>;
  activityId: number;
  onRefresh: () => void;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};

export default function Calendar({
  year,
  month,
  onChangeYear,
  onChangeMonth,
  days,
  dataMap,
  activityId,
  onRefresh,
  prevIcon,
  nextIcon,
}: CalendarProps) {
  const handleMonthPrev = () => {
    if (month === 0) {
      onChangeYear(year - 1);
      onChangeMonth(11); // 12월로 설정
    } else {
      onChangeMonth(month - 1);
    }
  };

  const handleMonthNext = () => {
    if (month === 11) {
      onChangeYear(year + 1);
      onChangeMonth(0); // 1월로 설정
    } else {
      onChangeMonth(month + 1);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const today = removeTime(new Date());

  // 캘린더 생성
  const calendar = generateCalendar({
    currentYear: year,
    currentMonth: month,
    dataMap: dataMap,
  });

  const handleDateClick = (date: string) => {
    // 예약 정보가 있을 때만 모달 열기
    if (dataMap.has(date)) {
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
    <>
      <ControlBar
        onPrev={handleMonthPrev}
        onNext={handleMonthNext}
        year={year}
        month={month}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
      />
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
    </>
  );
}
