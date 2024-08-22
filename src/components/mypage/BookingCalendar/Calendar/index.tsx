import useClickOutside from '@/hooks/useClickOutside';
import {
  getLocalDateString,
  isPastDate,
  removeTime,
} from '@/libs/utils/dateUtils';
import { ReactNode, useRef, useState } from 'react';

import BookingDetailModal from '../BookingDetailModal.tsx/BookingDetailModal';
import StatusTag from '../BookingDetailModal.tsx/BookingStatusTag';
import ControlBar from './ControlBar';
import DateCell from './DateCell';
import { generateCalendar } from './generateCalendar';

type CalendarProps = {
  year: number;
  month: number;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  dayFormat?: 'kor' | 'eng';
  dataMap: Map<string, Record<string, string>>;
  onRefresh: () => void;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};

const DAYS_KOR = ['일', '월', '화', '수', '목', '금', '토'];
const DAYS_ENG = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

export default function Calendar({
  year,
  month,
  onChangeYear,
  onChangeMonth,
  dayFormat,
  dataMap,
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
  const days = dayFormat === 'kor' ? DAYS_KOR : DAYS_ENG;

  // 캘린더 생성
  const calendar = generateCalendar({
    currentYear: year,
    currentMonth: month,
    dataMap: dataMap,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate('');
    onRefresh();
  };

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
            return (
              <DateCell
                key={`${weekIndex}-${dateIndex}`}
                dateObject={dateObject}
              />
            );
          }),
        )}
      </div>
    </>
  );
}
