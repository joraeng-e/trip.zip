import { CalendarStyle } from '@/styles/CalendarStyle';
import moment from 'moment';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

import Schedule from './Schedule';

interface ReservationSideBarProps {
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  className?: string;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReservationSideBar(props: ReservationSideBarProps) {
  const { price, schedules, className } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [selectedSchedules, setSelectedSchedules] = useState<
    { startTime: string; endTime: string }[] | null
  >(null);

  const isScheduledDate = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return schedules.some((schedule) => schedule.date === formattedDate);
  };

  const handleDateClick = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const dateValue = Array.isArray(value) ? value[0] : value;

    if (dateValue) {
      const formattedDate = moment(dateValue).format('YYYY-MM-DD');
      const filteredSchedules = schedules.filter(
        (schedule) => schedule.date === formattedDate,
      );

      setSelectedSchedules(
        filteredSchedules.length > 0 ? filteredSchedules : null,
      );
      setDate(dateValue);
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (!isScheduledDate(date)) {
      return 'text-gray-400 line-through not-scheduled'; // 스케줄이 없는 경우
    }
    return ''; // 스케줄이 있는 경우
  };

  const handleButtonClick = (
    index: number,
    schedule: { startTime: string; endTime: string },
  ) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={`w-full rounded-lg border-2 border-custom-gray-400 p-16 text-nomad-black ${className || 'sticky top-160'}`}
    >
      <div className="my-10 text-center text-2xl-bold">
        {price}
        <span className="text-lg-regular text-custom-gray-700"> / 인</span>
      </div>
      <div>
        <CalendarStyle
          locale="ko"
          value={date}
          onChange={handleDateClick}
          formatDay={(locale, date) => moment(date).format('DD')}
          formatYear={(locale, date) => moment(date).format('YYYY')}
          formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
          minDetail="month"
          maxDetail="month"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          calendarType="gregory"
          tileClassName={tileClassName}
        />
      </div>
      {selectedSchedules && selectedSchedules.length > 0 && (
        <Schedule
          selectedSchedules={selectedSchedules}
          activeIndex={activeIndex}
          handleButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
}
