import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';
import { notify } from '@/components/commons/Toast';
import { GetActivityDetailResponse, GetUserInfoResponse } from '@trip.zip-api';

import ReservationCard from './ReservationCard';

interface ReservationModalProps {
  selectedScheduleId: number | null;
  detailData: GetActivityDetailResponse;
  userData: GetUserInfoResponse;
  guestCount: number;
  selectedDate: Date | null;
  isSameUser: boolean;
  activeIndex: number | null;
  selectedSchedules: { startTime: string; endTime: string; id: number }[];
  handleSubmitReservation: () => void;
}

export default function ReservationModal(props: ReservationModalProps) {
  const {
    selectedScheduleId,
    detailData,
    userData,
    guestCount,
    selectedDate,
    isSameUser,
    activeIndex,
    selectedSchedules,
    handleSubmitReservation,
  } = props;

  const handleTriggerClick = () => {
    if (selectedScheduleId === null) {
      notify('warning', '스케쥴을 선택해주세요.');
    }
  };

  return (
    <Modal.Root>
      <Modal.Trigger disabled={selectedScheduleId === null}>
        <Button
          variant="activeButton"
          className={`mt-4 h-36 rounded-md text-md-bold ${isSameUser ? 'hidden' : ''}`}
          onClick={handleTriggerClick}
        >
          예약하기
        </Button>
      </Modal.Trigger>

      <Modal.Content className="mx-20 w-full max-w-800">
        <Modal.Description>
          <ReservationCard
            detailData={detailData}
            userData={userData}
            guestCount={guestCount}
            selectedDate={selectedDate}
            activeIndex={activeIndex}
            selectedSchedules={selectedSchedules}
          />
        </Modal.Description>
        <Modal.Close
          onConfirm={handleSubmitReservation}
          className="mt-4 rounded-md"
        >
          예약하기
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  );
}
