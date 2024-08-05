import { ReactNode } from 'react';

type BookingInfo = {
  completed: number;
  confirmed: number;
  pending: number;
};

type StatusTagProps = {
  bookingInfo: BookingInfo;
};

const statusTagStyle = '';

export default function StatusTag({ bookingInfo }: StatusTagProps) {
  return (
    <>
      {bookingInfo.completed > 0 && (
        <div className="h-23 w-full rounded-[4px] bg-custom-gray-300 px-3 text-14 font-medium text-custom-gray-800">
          <span>완료 </span>
          <span className="font-extrabold">{bookingInfo.completed}</span>
        </div>
      )}
      {bookingInfo.confirmed > 0 && (
        <div className="h-23 w-full rounded-[4px] bg-custom-orange-100 px-3 text-14 font-medium text-custom-orange-200">
          <span>확정 </span>
          <span className="font-extrabold">{bookingInfo.confirmed}</span>
        </div>
      )}
      {bookingInfo.pending > 0 && (
        <div className="h-23 w-full rounded-[4px] bg-custom-blue-300 px-6 text-14 font-medium text-white">
          <span>대기 </span>
          <span className="font-extrabold">{bookingInfo.pending}</span>
        </div>
      )}
    </>
  );
}
