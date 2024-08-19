import { GetActivityDetailResponse } from '@trip.zip-api';

import BaseModal from '../BaseModal';
import ReservationSideBar from './ReservationSideBar';

interface MobileReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GetActivityDetailResponse;
  isSameUser: boolean;
}

export default function MobileReservationModal(
  props: MobileReservationModalProps,
) {
  const { isOpen, onClose, data, isSameUser } = props;

  const handleReservationComplete = () => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="mx-60">
      <ReservationSideBar
        detailData={data}
        className="relative bottom-0 w-400"
        isSameUser={isSameUser}
        onReservationComplete={handleReservationComplete}
      />
    </BaseModal>
  );
}
