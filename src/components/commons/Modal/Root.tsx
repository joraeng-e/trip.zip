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
  onOpenChange?: (open: boolean) => void;
}
interface ModalContextProps extends Pick<ModalRootProps, 'open'> {
  handleOpenChange: (open: boolean) => void;
  trigger: RefObject<HTMLDivElement> | undefined;
  setTrigger: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>;
}
const ModalContext = createContext<ModalContextProps>({
  open: false,
  handleOpenChange: () => {},
  trigger: undefined,
  setTrigger: () => {},
});

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
  const [trigger, setTrigger] = useState<
    RefObject<HTMLDivElement> | undefined
  >();

  const handleOpenChange = (currentOpen: boolean) => {
    console.log({ currentOpen });
    setOpen(currentOpen);
    onOpenChange?.(currentOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && open) {
        handleOpenChange(false); // 엔터 키를 눌렀을 때 모달 닫기
      }
    };

    // 키보드 이벤트 리스너 추가
    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]); // open 값이 변경될 때마다 리스너를 업데이트

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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
