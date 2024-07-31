import useClickOutside from '@/hooks/useClickOutside';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState, // ReactElement,
  // useEffect,
  // useLayoutEffect,
} from 'react';

import Body from './DropdownBody';
import Button from './DropdownButton';
import Item from './DropdownItem';

type DropdownProps = {
  children: ReactNode;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  width?: number;
  height?: number;
};

type DropdownContextProps = {
  toggleDropdown: () => void;
  isOpen: boolean;
  handleSelect: (value: string) => void;
  selected: string;
  width?: number;
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
 * @param width - dropdown Button, 각 Item의 너비
 * @param height - dropdown Button 높이, Item 높이 자동 설정
 * @example
 * ```
 * const [value, setValue] = useState('첫번째');
 * <Dropdown
          selected={value}
          setSelected={setValue}
          width={}
          height={}
  >
    <Dropdown.Button />
    <Dropdown.Body>
      <Dropdown.Item value="첫번째" /> - value, label 동일한 경우
      <Dropdown.Item value="second">두번째</Dropdown.Item> - value, label 다른 경우
    </Dropdown.Body>
  </Dropdown>
 ```
 * @author Adam
 */
export default function Dropdown({
  children,
  selected,
  setSelected,
  width,
  height,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = useCallback((value: string) => setSelected(value), []);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, toggleDropdown);

  // Todo : Items 요소 중 첫번째 요소의 value 자동으로 기본값으로 설정 해보고 싶었는데 실패했습니다.. 조금 더 연구해보고 구현 해볼게요!
  // useLayoutEffect(() => {
  //   if (!selected) {
  //     const firstItem = React.Children.toArray(children)
  //       .filter((child): child is ReactElement => React.isValidElement(child))
  //       .find((child) => child.type === Item);

  //     if (firstItem && !selected) {
  //       setSelected(firstItem.props.value);
  //     }
  //   }
  // }, [children, selected, setSelected]);

  return (
    <DropdownContext.Provider
      value={{
        toggleDropdown,
        isOpen,
        handleSelect,
        selected,
        width,
        height,
      }}
    >
      <div ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
}

Dropdown.Button = Button;
Dropdown.Body = Body;
Dropdown.Item = Item;
