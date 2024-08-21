import Button from '@/components/commons/Button';
import { useState } from 'react';

import { Reservation } from './BookingDetailModal';
import ConfirmationModal from './ConfirmationModal';

type BookingDetailCardProps = {
  reservation: Reservation;
  onConfirm: (id: number) => void;
  onDecline: (id: number) => void;
};

export default function BookingDetailCard({
  reservation,
  onConfirm,
  onDecline,
}: BookingDetailCardProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');

  const handleClickAction = (action: 'confirm' | 'decline') => {
    setAction(action);
    setIsConfirmModalOpen(true);
  };

  const handleClickConfirm = () => {
    if (action === 'confirm') {
      onConfirm(reservation.id);
    } else {
      onDecline(reservation.id);
    }
    setIsConfirmModalOpen(false);
  };

  return (
    <div
      key={reservation.id}
      className="flex flex-col justify-center gap-6 rounded-xl border-1 border-custom-gray-300 p-16"
    >
      <div className="flex gap-10">
        <span className="text-16 font-semibold text-custom-gray-700 dark:text-custom-gray-400">
          닉네임
        </span>
        <span className="text-16 font-medium">{reservation.nickname}</span>
      </div>
      <div className="flex gap-10">
        <span className="text-16 font-semibold text-custom-gray-700 dark:text-custom-gray-400">
          인원
        </span>
        <span className="text-16 font-medium">{reservation.headCount}</span>
      </div>
      <div className="flex w-full justify-end">
        {reservation.status === 'pending' && (
          <div className="flex w-220 gap-6">
            <Button
              variant="activeButton"
              hasICon={false}
              className="h-38 rounded-md"
              onClick={() => handleClickAction('confirm')}
            >
              승인하기
            </Button>
            <Button
              variant="inactiveButton"
              hasICon={false}
              className="h-38 rounded-md"
              onClick={() => handleClickAction('decline')}
            >
              거절하기
            </Button>
          </div>
        )}
        {reservation.status === 'confirmed' && (
          <div className="flex-center h-44 w-82 rounded-[26px] bg-custom-orange-100 text-14 font-bold text-custom-orange-200">
            <span>예약 승인</span>
          </div>
        )}
        {reservation.status === 'declined' && (
          <div className="flex-center h-44 w-82 rounded-[26px] bg-custom-red-100 text-14 font-bold text-custom-red-200">
            <span>예약 거절</span>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        message={
          action === 'confirm'
            ? '예약을 승인하시겠습니까?'
            : '예약을 거절하시겠습니까?'
        }
        onConfirm={handleClickConfirm}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}
