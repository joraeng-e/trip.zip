import { ReactNode } from 'react';

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
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
  onClickDate?: (date: string) => void;
};

const DAYS_KOR = ['일', '월', '화', '수', '목', '금', '토'];
const DAYS_ENG = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

export default function Calendar({
  year = 1998,
  month = 9,
  onChangeYear,
  onChangeMonth,
  dayFormat,
  dataMap,
  prevIcon,
  nextIcon,
  onClickDate,
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

  const days = dayFormat === 'kor' ? DAYS_KOR : DAYS_ENG;
  const weekend = (day: string) => {
    if (day === 'SUN' || day === '일') {
      return 'text-red-400';
    } else if (day === 'SAT' || day === '토') {
      return 'text-blue-400';
    } else return;
  };

  // 캘린더 생성
  const calendar = generateCalendar({
    currentYear: year,
    currentMonth: month,
    dataMap: dataMap,
  });

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
      <div className={`grid grid-cols-7 gap-2 rounded-lg border-1`}>
        {days.map((day) => (
          <div
            key={day}
            className={`flex h-43 items-center border-b-1 border-custom-gray-400 pl-6 text-13 md:text-17 ${weekend(day)}`}
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
                onClickDate={onClickDate}
              />
            );
          }),
        )}
      </div>
    </>
  );
}
