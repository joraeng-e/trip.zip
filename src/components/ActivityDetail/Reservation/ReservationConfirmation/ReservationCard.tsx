import { GetActivityDetailResponse, GetUserInfoResponse } from '@trip.zip-api';

import ActivityDetail from './ActivityDetail';
import ReservationDetails from './ReservationDetails';
import ReservationUser from './ReservationUser';

interface ReservationCardProps {
  detailData: GetActivityDetailResponse;
  userData: GetUserInfoResponse;
  guestCount: number;
  selectedDate: Date | null;
  activeIndex: number | null;
  selectedSchedules: { startTime: string; endTime: string }[];
}

export default function ReservationCard(props: ReservationCardProps) {
  const {
    detailData,
    userData,
    guestCount,
    selectedDate,
    activeIndex,
    selectedSchedules,
  } = props;
  return (
    <div className="h-auto">
      <h2 className="ml-10 text-2xl-bold">예약 확인</h2>
      <ActivityDetail detailData={detailData} />
      <ReservationUser userData={userData} />
      <ReservationDetails
        guestCount={guestCount}
        selectedDate={selectedDate}
        activeIndex={activeIndex}
        selectedSchedules={selectedSchedules}
        price={detailData.price}
      />
    </div>
  );
}
