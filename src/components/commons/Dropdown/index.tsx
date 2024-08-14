import useClickOutside from '@/hooks/useClickOutside';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import Body from './DropdownBody';
import Button from './DropdownButton';
import Item from './DropdownItem';

type DropdownProps = {
  children: ReactNode;
  selected: string;
  setSelected: (value: string) => void;
  defaultValue?: string;
  width?: number;
  maxWidth?: number;
  height?: number;
};

type DropdownContextProps = {
  toggleDropdown: () => void;
  isOpen: boolean;
  handleSelect: (value: string) => void;
  selected: string;
  width?: number;
  maxWidth?: number;
  height?: number;
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

/**
 * Dropdown with rounded square shape
 * @param selected - dropdown으로 조작할 state
 * @param setSelected - dropdown으로 조작할 state의 setState 메소드
 * @param maxWidth - dropdown list 너비, maxWidth로 적용(optional)
 * @param height - dropdown item 높이, list 높이 자동 설정(optional)
 * @example
 * ```
 * const [value, setValue] = useState('첫번째');
 * <Dropdown
          selected={value}
          setSelected={setValue}
          maxWidth={}
          height={}
          defaultValue="필터"
  >
    <Dropdown.Button className="tailwind 쓸 수 있어요(optional)">
      {jsx}
    </Dropdown.Button>
    <Dropdown.Body>
      <Dropdown.Item value="recent" />
      <Dropdown.Item value="lowest">낮은가격순</Dropdown.Item> - value, label 다른 경우
    </Dropdown.Body>
  </Dropdown>
 ```
 * @author Adam
 */
export default function Dropdown({
  children,
  setSelected,
  selected,
  width,
  maxWidth,
  height,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = useCallback(
    (value: string) => setSelected(value),
    [setSelected],
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, closeDropdown);

  return (
    <DropdownContext.Provider
      value={{
        toggleDropdown,
        isOpen,
        handleSelect,
        selected,
        width,
        maxWidth,
        height,
      }}
    >
      <div className="relative" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Button = Button;
Dropdown.Body = Body;
Dropdown.Item = Item;
