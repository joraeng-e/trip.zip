import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import Body from './DropdownBody';
import Button from './DropdownButton';
import Item from './DropdownItem';

type DropdownProps = {
  children: ReactNode;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

type DropdownContextProps = {
  toggleDropdown: () => void;
  isOpen: boolean;
  handleSelect: (value: string) => void;
  selected: string;
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

export default function Dropdown({
  children,
  selected,
  setSelected,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = useCallback((value: string) => setSelected(value), []);

  return (
    <DropdownContext.Provider
      value={{
        toggleDropdown,
        isOpen,
        handleSelect,
        selected,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

Dropdown.Button = Button;
Dropdown.Body = Body;
Dropdown.Item = Item;
