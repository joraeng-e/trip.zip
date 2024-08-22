import moment from 'moment';

interface ReservationDetailsProps {
  guestCount: number;
  selectedDate: Date | null;
  activeIndex: number | null;
  selectedSchedules: { startTime: string; endTime: string }[];
  price: number;
}

export default function ReservationDetails(props: ReservationDetailsProps) {
  const { guestCount, selectedDate, activeIndex, selectedSchedules, price } =
    props;
  return (
    <div className="dark-border my-20 rounded-lg py-20 shadow-lg">
      <div className="ml-20 text-xl-bold">예약 내용</div>
      <div className="mt-2 flex justify-between">
        <div className="my-10 ml-20">
          <div className="mb-4 text-lg-medium">인원 수: {guestCount}</div>
          <div className="text-lg-medium">
            예약일시: {moment(selectedDate).format('YYYY년 MM월 DD일')} /{' '}
            {activeIndex !== null && selectedSchedules[activeIndex]
              ? `${selectedSchedules[activeIndex].startTime} ~ ${selectedSchedules[activeIndex].endTime}`
              : '선택된 일정이 없습니다.'}
          </div>
        </div>
      </div>
      <hr className="contour" />
      <div className="mx-20 mt-10 flex justify-between text-xl-bold">
        총 상품 금액
        <div className="text-custom-green-300">
          {(guestCount * price).toLocaleString()} 원
        </div>
      </div>
    </div>
  );
}
