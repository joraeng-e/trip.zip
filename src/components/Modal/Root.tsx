import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export interface ModalRootProps extends PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open?: boolean) => void;
}
interface ModalContextProps extends Pick<ModalRootProps, 'open'> {
  handleOpenChange?: (open?: boolean) => void;
  trigger: RefObject<HTMLButtonElement> | undefined;
  setTrigger: Dispatch<
    SetStateAction<RefObject<HTMLButtonElement> | undefined>
  >;
}
const ModalContext = createContext<ModalContextProps>({
  open: undefined,
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
  const [open, setOpen] = useState<boolean | undefined>(openProp);
  const [trigger, setTrigger] = useState<
    RefObject<HTMLButtonElement> | undefined
  >();
  const handleOpenChange = (currentOpen?: boolean) => {
    console.log({ currentOpen });
    setOpen(currentOpen);
    onOpenChange?.(currentOpen);
  };

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
