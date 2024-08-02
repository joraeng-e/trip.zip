import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import SelectOption from './SelectOption';

interface Option {
  value: string;
  label: string;
}

interface DropdownListProps {
  isOpen: boolean;
  options: Option[];
  onSelect: (value: string) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({
  isOpen,
  options,
  onSelect,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg"
      >
        {options.map((option) => (
          <SelectOption
            key={option.value}
            value={option.value}
            label={option.label}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default DropdownList;
