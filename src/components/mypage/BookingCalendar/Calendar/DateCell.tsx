import { getLocalDateString, isPastDate } from '@/libs/utils/dateUtils';

import StatusTag from '../BookingDetailModal.tsx/BookingStatusTag';
import { DateObject } from './generateCalendar';

type DateCellProps = {
  dateObject: DateObject;
  onClickDate?: (date: string) => void;
};

export default function DateCell({ dateObject, onClickDate }: DateCellProps) {
  const today = new Date();
  const alertClass = isPastDate(dateObject.date, today)
    ? 'bg-custom-gray-800'
    : 'bg-green-400';
  const dateString = getLocalDateString(dateObject.date);
  const hasBooking = !!dateObject.scheduleInfo;

  const handleClick = () => {
    if (onClickDate) {
      onClickDate(dateString);
    }
  };

  return (
    <button
      className={`flex h-120 w-full flex-col justify-between border-t-1 border-custom-gray-400 pb-6 pl-6 md:h-154 ${
        hasBooking ? '' : 'cursor-default opacity-50'
      } ${dateString === getLocalDateString(today) ? 'bg-custom-gray-200 dark:bg-custom-green-200' : ''}`}
      type="button"
      onClick={handleClick}
      disabled={!hasBooking}
    >
      <div
        className={`flex flex-col ${dateObject.isCurrentMonth ? '' : 'opacity-30'}`}
      >
        <span className="text-17 font-medium md:text-21">{dateObject.day}</span>
        {dateObject.scheduleInfo && (
          <div className={`${alertClass} size-8 rounded-full`} />
        )}
      </div>
      {dateObject.scheduleInfo && (
        <StatusTag bookingInfo={dateObject.scheduleInfo} />
      )}
    </button>
  );
}
