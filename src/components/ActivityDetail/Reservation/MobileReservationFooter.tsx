import { GetActivityDetailResponse } from '@trip.zip-api';
import { useState } from 'react';

import Button from '../../commons/Button';
import MobileReservationModal from './MobileReservationModal';

interface MobileReservationFooterProps {
  data: GetActivityDetailResponse;
  isSameUser: boolean;
}

export default function MobileReservationFooter(
  props: MobileReservationFooterProps,
) {
  const { data, isSameUser } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="md:hidden">
        <div className="fixed bottom-0 left-0 right-0 h-70 border-t-2 bg-white p-10 shadow-lg">
          <Button
            variant="activeButton"
            className="h-36 rounded-md text-md-bold"
            onClick={handleOpenModal}
          >
            예약하기
          </Button>
        </div>
        <MobileReservationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={data}
          isSameUser={isSameUser}
        />
      </div>
    </>
  );
}
