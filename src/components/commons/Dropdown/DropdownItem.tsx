import { ReactNode } from 'react';

import { useDropdownContext } from '.';

export type ItemProps = {
  children?: ReactNode;
  value: string;
  text?: string;
  className?: string;
};

/**
 * 드롭다운 리스트로 사용될 아이템 컴포넌트
 * @param value - selected의 값으로 할당 될 값
 * @param text - 버튼 안의 텍스트로 전달될 값(optional, text || value)
 */
const Item: React.FC<ItemProps> = ({ children, value, text, ...rest }) => {
  const { handleSelect, toggleDropdown, height, setButtonText } =
    useDropdownContext();

  const itemHeight = height ? height - 10 : 41;

  const onSelect = () => {
    handleSelect(value);
    setButtonText(text || value);
    toggleDropdown();
  };

  return (
    <li
      {...rest}
      style={{ height: itemHeight }}
      className="flex-center flex h-auto w-full cursor-pointer justify-between rounded-lg py-3 hover:bg-custom-gray-300"
      onClick={onSelect}
    >
      <span className="w-full text-center text-14 font-light md:text-18">
        {children || text}
      </span>
    </li>
  );
};

export default Item;
