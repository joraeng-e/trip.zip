import { CalendarStyle } from '@/styles/CalendarStyle';
import moment from 'moment';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import Schedule from './Schedule';

interface ReservationSideBarProps {
  price: number;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  isSameUser: boolean;
  className?: string;
}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReservationSideBar(props: ReservationSideBarProps) {
  const { price, schedules, isSameUser, className } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
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

  const handleScheduleClick = (
    index: number,
    schedule: { startTime: string; endTime: string },
  ) => {
    setActiveIndex(index);
    if (isSameUser) {
      alert('같은 사용자입니다. 다른 알림이 표시됩니다!');
    } else {
      alert(`선택한 예약 시간: ${schedule.startTime} ~ ${schedule.endTime}`);
    }
  };

  // 총 금액 계산
  const totalPrice = price * guestCount;

  // 인원 수 조절 함수
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
        {totalPrice} {/* 총 금액 표시 */}
        <span className="text-lg-regular text-custom-gray-700">
          {' '}
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
      {selectedSchedules && selectedSchedules.length > 0 && (
        <Schedule
          selectedSchedules={selectedSchedules}
          activeIndex={activeIndex}
          isSameUser={isSameUser}
          handleScheduleClick={handleScheduleClick}
        />
      )}
    </div>
  );
}
