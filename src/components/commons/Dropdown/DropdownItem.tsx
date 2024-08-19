import { ReactNode } from 'react';

import { useDropdownContext } from '.';

export type ItemProps = {
  children?: ReactNode;
  value: string;
  className?: string;
};

/**
 * 드롭다운 리스트로 사용될 아이템 컴포넌트
 * @param value - selected의 값으로 할당 될 값
 * @param text - 버튼 안의 텍스트로 전달될 값(optional, text || value)
 */
const Item: React.FC<ItemProps> = ({ children, value, ...rest }) => {
  const { handleSelect, toggleDropdown, height } = useDropdownContext();

  const itemHeight = height ? height - 10 : 41;

  const onSelect = () => {
    handleSelect(value);
    toggleDropdown();
  };

  return (
    <li
      {...rest}
      style={{ minHeight: itemHeight }}
      className="flex-center flex w-full cursor-pointer justify-between rounded-lg py-3 duration-300 hover:bg-custom-gray-300 active:bg-custom-gray-400 dark:hover:bg-custom-gray-800"
      onClick={onSelect}
    >
      <span className="w-full text-center text-14 font-light md:text-18">
        {children || value}
      </span>
    </li>
  );
};

export default Item;
