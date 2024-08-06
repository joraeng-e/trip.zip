import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export default function ImageModal(props: ImageModalProps) {
  const { isOpen, onClose, images } = props;
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
            className="max-h-full w-full max-w-full overflow-auto bg-white p-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
          >
            <button onClick={onClose} className="mb-4 text-red-500">
              닫기
            </button>

            <div className="grid grid-cols-2 gap-2">
              {images.map((url, index) => (
                <div key={index} className="relative h-500 w-full">
                  <Image
                    src={url}
                    alt={`modal-image-${index}`}
                    fill
                    className="rounded-[10px] object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
