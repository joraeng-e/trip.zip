import { ReactNode } from 'react';

import { useDropdownContext } from '.';

export type ItemProps = {
  children: ReactNode;
  value: string;
  className?: string;
};

const Item: React.FC<ItemProps> = ({ children, value, className, ...rest }) => {
  const { handleSelect, toggleDropdown } = useDropdownContext();

  const onSelect = () => {
    handleSelect(value);
    toggleDropdown();
  };

  return (
    <li {...rest} onClick={onSelect}>
      {children}
    </li>
  );
};

export default Item;
