import Button from '@/components/commons/Button';
import { motion } from 'framer-motion';

type ConfirmationModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex h-140 w-280 flex-col justify-between rounded-lg bg-white p-28 shadow-lg">
        <p className="text-lg mb-4 font-medium text-gray-800">{message}</p>
        <div className="flex gap-6">
          <Button variant="inactiveButton" onClick={onCancel}>
            취소
          </Button>
          <Button variant="activeButton" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
