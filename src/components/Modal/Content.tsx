import { XIcon } from '@/libs/utils/Icon';
import { ModalProps } from '@/types/modaltype';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useModalContext } from './Root';

interface ModalContentProps extends ModalProps {
  Icon?: boolean;
}

export default function ModalContent(props: ModalContentProps) {
  const { children, Icon, className } = props;
  const { open: currentOpenState, handleOpenChange } = useModalContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && overlayRef.current === event.target) {
      if (handleOpenChange) {
        handleOpenChange(false);
      }
    }
  };

  const handleClose = () => {
    if (handleOpenChange) {
      handleOpenChange(false);
    }
  };

  const renderPortal = () => {
    if (currentOpenState) {
      return createPortal(
        <div
          ref={overlayRef}
          className={`fixed inset-0 -z-50 flex items-center justify-center bg-gray-500/30 ${className}`}
          onClick={handleClickOverlay}
        >
          <div
            className={`rounded-10 first-line:bg-grayscale-50 relative z-50 mx-2 flex h-auto w-[335px] flex-col bg-white p-[20px] shadow-lg md:w-[395px] ${className}`}
          >
            {Icon && (
              <button onClick={handleClose} className="absolute right-4 top-4">
                <XIcon />
              </button>
            )}
            {children}
          </div>
        </div>,
        document.body,
      );
    }
    return null;
  };

  return <>{renderPortal()}</>;
}
