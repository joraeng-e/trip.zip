import { getAvailableSchedule } from '@/libs/api/activities';
import { CalendarStyle } from '@/styles/CalendarStyle';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import Schedule from './Schedule';

interface ReservationSideBarProps {
  price: number;
  id: number;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  isSameUser: boolean;
  className?: string;
}

export default function ReservationSideBar(props: ReservationSideBarProps) {
  const { price, isSameUser, className, schedules, id } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [selectedSchedules, setSelectedSchedules] = useState<
    { startTime: string; endTime: string; id: number }[] | null
  >(null);

  const { data } = useQuery({
    queryKey: ['availableSchedule', date],
    queryFn: () => {
      const year = moment(date).year().toString();
      const month = (moment(date).month() + 1).toString().padStart(2, '0');

      return getAvailableSchedule(id, year, month);
    },
  });

  const isScheduledDate = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    return schedules.some((schedule) => schedule.date === formattedDate);
  };

  const handleDateClick = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const dateValue = Array.isArray(value) ? value[0] : value;

    if (dateValue) {
      const formattedDate = moment(dateValue).format('YYYY-MM-DD');
      const filteredSchedules = schedules
        .filter((schedule) => schedule.date === formattedDate)
        .map((schedule) => ({
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          id: schedule.id,
        }));

      setSelectedSchedules(
        filteredSchedules.length > 0 ? filteredSchedules : null,
      );
      setDate(dateValue);
      console.log(Date, 'data 변경됨 ');
    }
    console.log('호출되었음');
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (!isScheduledDate(date)) {
      return 'text-gray-400 line-through not-scheduled';
    }
    return '';
  };

  const handleScheduleClick = (
    index: number,
    schedule: { startTime: string; endTime: string; id: number },
  ) => {
    setActiveIndex(index);
    console.log(`선택한 스케줄 ID: ${schedule.id}`);
  };

  const totalPrice = price * guestCount;

  const increaseGuestCount = () => {
    setGuestCount((prevCount) => prevCount + 1);
  };

  const decreaseGuestCount = () => {
    setGuestCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  return (
    <div
      className={`w-full rounded-lg border-2 border-custom-gray-400 p-16 text-nomad-black ${className || 'sticky top-160'}`}
    >
      <div className="relative my-20 text-center text-2xl-bold">
        {totalPrice}
        <span className="text-lg-regular text-custom-gray-700">
          / {guestCount}명
        </span>
        <div className="absolute -top-4 right-0 flex-col items-center justify-center">
          <FaAngleUp
            onClick={increaseGuestCount}
            className="size-20 cursor-pointer"
          />
          <FaAngleDown
            onClick={decreaseGuestCount}
            className={`size-20 cursor-pointer ${guestCount <= 1 ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
          />
        </div>
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
      {selectedSchedules && selectedSchedules.length > 0 && data && (
        <Schedule
          selectedSchedules={selectedSchedules}
          activeIndex={activeIndex}
          isSameUser={isSameUser}
          handleScheduleClick={handleScheduleClick}
          bookableSchedule={data}
        />
      )}
    </div>
  );
}
