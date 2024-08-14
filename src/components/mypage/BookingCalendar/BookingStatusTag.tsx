type BookingInfo = {
  completed: number;
  confirmed: number;
  pending: number;
};

type StatusTagProps = {
  bookingInfo: BookingInfo;
};

const statusTag =
  'h-23 w-full rounded-[4px] px-3 text-12 font-medium flex items-center md:text-14 gap-4';

export default function StatusTag({ bookingInfo }: StatusTagProps) {
  return (
    <>
      {bookingInfo.completed > 0 && (
        <div className={`${statusTag} bg-custom-gray-300 text-custom-gray-800`}>
          <span>완료</span>
          <span>{bookingInfo.completed}</span>
        </div>
      )}
      {bookingInfo.confirmed > 0 && (
        <div
          className={`${statusTag} bg-custom-orange-100 text-custom-orange-200`}
        >
          <span>확정</span>
          <span>{bookingInfo.confirmed}</span>
        </div>
      )}
      {bookingInfo.pending > 0 && (
        <div className={`${statusTag} bg-custom-blue-300 text-white`}>
          <span>대기</span>
          <span>{bookingInfo.pending}</span>
        </div>
      )}
    </>
  );
}
