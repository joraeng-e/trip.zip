import { ReactNode } from 'react';

import { useDropdownContext } from '.';

export type ItemProps = {
  children?: ReactNode;
  value: string;
  className?: string;
};

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
      style={{ height: itemHeight }}
      className="flex-center flex h-auto w-full cursor-pointer justify-between rounded-lg py-3 hover:bg-custom-gray-300"
      onClick={onSelect}
    >
      <span className="w-full text-center">{children || value}</span>
    </li>
  );
};

export default Item;
