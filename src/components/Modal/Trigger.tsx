import { ModalProps } from '@/types/modaltype';
import { DetailedHTMLProps, useEffect, useRef } from 'react';

import { useModalContext } from './Root';

export interface ModalTriggerProps
  extends ModalProps,
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

export default function ModalTrigger(props: ModalTriggerProps) {
  const { children, className, ...buttonElementProps } = props;
  const {
    open: currentOpenState,
    handleOpenChange,
    setTrigger,
  } = useModalContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClickTrigger = () => {
    if (buttonElementProps.disabled) {
      return;
    }
    handleOpenChange?.(!currentOpenState);
  };

  useEffect(() => {
    if (triggerRef.current) {
      setTrigger(triggerRef);
    }
  }, [triggerRef.current]);

  return (
    <button
      {...buttonElementProps}
      onClick={handleClickTrigger}
      ref={triggerRef}
      className={`${className}`}
    >
      {children}
    </button>
  );
}
