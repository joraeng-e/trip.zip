import { XIcon } from '@/libs/utils/Icon';
// XIcon import
import { FC, PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useModalContext } from './Root';

interface ModalContentProps extends PropsWithChildren {
  Icon?: boolean; // Icon prop 추가 (boolean 타입)
}

const ModalContent: FC<ModalContentProps> = ({ children, Icon }) => {
  const { open: currentOpenState, handleOpenChange } = useModalContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    // Overlay(모달 바깥쪽) 클릭 시에만 모달을 닫음
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
          className="fixed inset-0 -z-50 flex items-center justify-center bg-gray-500/30"
          onClick={handleClickOverlay}
        >
          <div className="rounded-10 first-line:bg-grayscale-50 relative z-50 mx-2 flex h-auto w-[335px] flex-col bg-white p-[20px] shadow-lg md:w-[395px]">
            {/* Icon prop이 true일 때만 XIcon을 렌더링 */}
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
};

export default ModalContent;
