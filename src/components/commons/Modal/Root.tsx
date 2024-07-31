import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface ModalRootProps extends PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open?: boolean) => void;
}

interface ModalContextProps extends Pick<ModalRootProps, 'open'> {
  handleOpenChange: (open?: boolean) => void; // 필수로 변경
  trigger: RefObject<HTMLDivElement> | undefined;
  setTrigger: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('(!) Modal 컨텍스트를 호출할 수 없는 범위 입니다.');
  }
  return context;
};

export default function ModalRoot(props: ModalRootProps) {
  const { children, open: openProp = false, onOpenChange } = props;
  const [open, setOpen] = useState<boolean>(openProp);
  const [trigger, setTrigger] = useState<RefObject<HTMLDivElement> | undefined>(
    undefined,
  );

  const handleOpenChange = (currentOpen?: boolean) => {
    setOpen(currentOpen !== undefined ? currentOpen : !open); // 상태 반전
    onOpenChange?.(currentOpen);
  };

  // openProp이 변경될 때 상태 업데이트
  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const contextValue: ModalContextProps = {
    open,
    handleOpenChange,
    setTrigger,
    trigger,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
