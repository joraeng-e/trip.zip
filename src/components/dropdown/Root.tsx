import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type DropdownContextProps = {
  toggleDropdown: () => void;
  handleSelect: Dispatch<SetStateAction<string>>;
  selected: string;
  isOpen: boolean;
};

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('(!) Dropdown context롤 호출할 수 없는 범위입니다.');
  }
  return context;
};

export default function DropdownRoot(
  props: PropsWithChildren<Record<string, never>>,
) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider
      value={{
        toggleDropdown,
        handleSelect: setSelected,
        selected,
        isOpen,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}
