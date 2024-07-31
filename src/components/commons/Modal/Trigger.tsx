import { ModalProps } from '@/types/modaltype';
import { DetailedHTMLProps, useEffect, useRef } from 'react';

import { useModalContext } from './Root';

export interface ModalTriggerProps
  extends ModalProps,
    DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>, // button 대신 div로 변경
      HTMLDivElement
    > {
  disabled?: boolean; // disabled 속성 추가
}

export default function ModalTrigger(props: ModalTriggerProps) {
  const { children, className, disabled, ...divElementProps } = props;
  const {
    open: currentOpenState,
    handleOpenChange,
    setTrigger,
  } = useModalContext();
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClickTrigger = () => {
    if (disabled) {
      return; // disabled일 경우 클릭 무시
    }
    handleOpenChange?.(!currentOpenState);
  };

  useEffect(() => {
    if (triggerRef.current) {
      setTrigger(triggerRef);
    }
  }, [triggerRef.current]);

  return (
    <div
      {...divElementProps}
      onClick={handleClickTrigger} // 클릭 이벤트 수정
      ref={triggerRef}
      className={className}
    >
      {children}
    </div>
  );
}
