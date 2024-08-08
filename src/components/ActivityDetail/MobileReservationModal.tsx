import DetailData from '@/../public/data/activityDetail.json';
import { XIcon } from '@/libs/utils/Icon';
import { AnimatePresence, motion } from 'framer-motion';

import ActivitySideBar from './ActivitySideBar';

interface MobileReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileReservationModal(
  props: MobileReservationModalProps,
) {
  const { isOpen, onClose } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative h-auto max-h-full w-500 max-w-full overflow-auto rounded-md bg-white p-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
          >
            <XIcon
              onClick={onClose}
              className="absolute right-20 top-20 z-50 cursor-pointer"
            />

            <ActivitySideBar
              price={DetailData.price}
              schedules={DetailData.schedules}
              className="relative bottom-0" // sticky와 top-160 제거
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
