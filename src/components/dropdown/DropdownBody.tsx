import React, { ComponentType, ReactNode } from 'react';

import { useDropdownContext } from '.';

type BodyProps = {
  children: ReactNode;
};

const Body: React.FC<BodyProps> = ({ children, ...rest }) => {
  const { isOpen } = useDropdownContext();

  return isOpen ? (
    <ul className="" {...rest}>
      {children}
    </ul>
  ) : null;
};

export default Body;
