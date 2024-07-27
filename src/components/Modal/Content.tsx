import { XIcon } from '@/libs/utils/Icon';
import { PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useModalContext } from './Root';

export default function ModalContent(props: PropsWithChildren) {
  const { children } = props;
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

  const renderPortal = () => {
    if (currentOpenState) {
      return createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 -z-50 flex items-center justify-center bg-gray-500/30"
          onClick={handleClickOverlay}
        >
          <div className="rounded-10 first-line:bg-grayscale-50 z-50 mx-2 flex h-auto w-[335px] flex-col bg-white p-[20px] shadow-lg md:w-[395px]">
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
