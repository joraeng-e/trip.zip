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
  defaultValue?: string;
  width?: number;
  height?: number;
};

type DropdownContextProps = {
  toggleDropdown: () => void;
  isOpen: boolean;
  handleSelect: (value: string) => void;
  selected: string;
  setButtonText: (value: string) => void;
  buttonText: string;
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
 * @param width - dropdown Button, Item 너비, maxWidth로 적용(optional)
 * @param height - dropdown Button 높이, Item 높이 자동 설정(optional)
 * @param defaultValue - dropdown Button에 초기값으로 들어갈 텍스트
 * (optional, defaultValue || selected)
 * @example
 * ```
 * const [value, setValue] = useState('첫번째');
 * <Dropdown
          selected={value}
          setSelected={setValue}
          width={}
          height={}
          defaultValue="필터"
  >
    <Dropdown.Button />
    <Dropdown.Body>
      <Dropdown.Item text="최신순" value="recent" />
      <Dropdown.Item text="lowest" value="lowest">낮은가격순</Dropdown.Item> - text, label 다른 경우
      <Dropdown.Item text="높은가격순" value="highest" /> - text, value 다른 경우
    </Dropdown.Body>
  </Dropdown>
 ```
 * @author Adam
 */
export default function Dropdown({
  children,
  setSelected,
  selected,
  defaultValue,
  width,
  height,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState(defaultValue || selected);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = useCallback((value: string) => setSelected(value), []);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, closeDropdown);

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
        setButtonText,
        buttonText,
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
