import useClickOutside from '@/hooks/useClickOutside';
import { ArrowDown } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ maxWidth, position: 'relative' }}>
      <div
        className={`basic-input w-full dark:bg-custom-black dark:text-white ${
          error ? 'border-red-400' : ''
        } flex cursor-pointer items-center justify-between ${
          value ? 'text-black' : 'text-gray-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="combobox"
        aria-controls="combobox-options"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>
        <ArrowDown
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="dark-border base-input absolute z-10 mt-1 w-full rounded-md border-2 bg-white"
          role="listbox"
          id="combobox-options"
        >
          {options.map((option) => (
            <div
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`dark-base cursor-pointer p-10 pl-12 ${
                option.value === value ? 'bg-gray-100 font-bold' : ''
              } hover:bg-gray-100 hover:dark:bg-custom-gray-800`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </motion.div>
      )}
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">{error}</p>
      )}
    </div>
  );
}
