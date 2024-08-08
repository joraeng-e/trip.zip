import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { useDropdownContext } from '.';

type BodyProps = {
  children: ReactNode;
};

const Body: React.FC<BodyProps> = ({ children, ...rest }) => {
  const { isOpen, maxWidth } = useDropdownContext();

  return isOpen ? (
    <motion.ul
      style={{
        maxWidth: maxWidth,
      }}
      className="absolute z-40 mt-8 flex max-h-280 w-full min-w-90 flex-col justify-between gap-10 overflow-y-auto rounded-xl border-1 border-custom-gray-300 bg-white p-10 shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      {...rest}
    >
      {children}
    </motion.ul>
  ) : null;
};

export default Body;
