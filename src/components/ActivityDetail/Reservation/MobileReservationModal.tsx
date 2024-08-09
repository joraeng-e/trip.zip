import DetailData from '@/../public/data/activityDetail.json';

import BaseModal from '../BaseModal';
import ReservationSideBar from './ReservationSideBar';

interface MobileReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileReservationModal(
  props: MobileReservationModalProps,
) {
  const { isOpen, onClose } = props;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="mx-60">
      <ReservationSideBar
        price={DetailData.price}
        schedules={DetailData.schedules}
        className="relative bottom-0 w-400"
      />
    </BaseModal>
  );
}
