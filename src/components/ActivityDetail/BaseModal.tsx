import { XIcon } from '@/libs/utils/Icon';
import { AnimatePresence, motion } from 'framer-motion';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function BaseModal(props: BaseModalProps) {
  const { isOpen, onClose, className, children } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative h-auto max-h-full w-auto max-w-1200 overflow-auto rounded-md bg-white ${className}`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <XIcon
              onClick={onClose}
              className="absolute right-20 top-20 z-50 cursor-pointer"
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
