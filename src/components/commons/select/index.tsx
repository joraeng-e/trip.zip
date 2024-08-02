import { ArrowDown } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import { useState } from 'react';

import DropdownList from './DropdownList';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder: string;
  error?: string;
  maxWidth?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
  maxWidth,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (optionValue: string) => {
    onChange({
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  return (
    <div style={{ maxWidth, position: 'relative' }}>
      <div
        className={`basic-input flex w-full items-center justify-between ${error ? 'border-red-400' : ''} flex cursor-pointer items-center ${
          value ? 'text-black' : 'text-gray-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown />
        </motion.div>
      </div>
      <DropdownList isOpen={isOpen} options={options} onSelect={handleSelect} />
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">{error}</p>
      )}
    </div>
  );
}
