import { motion } from 'framer-motion';
import React from 'react';

import SelectOption from './SelectOption';

interface Option {
  value: string;
  label: string;
}

interface SelectListProps {
  isOpen: boolean;
  options: Option[];
  onSelect: (value: string) => void;
  selectedValue: string;
  focusedIndex: number;
}

/**
 * SelectList 컴포넌트
 *
 * 드롭다운 메뉴의 옵션 목록을 표시하는 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isOpen - 드롭다운 메뉴의 열림/닫힘 상태
 * @param {Option[]} props.options - 표시할 옵션들의 배열
 * @param {function} props.onSelect - 옵션 선택 시 호출될 함수
 * @param {string} props.selectedValue - 현재 선택된 옵션의 value
 * @param {number} props.focusedIndex - 현재 포커스된 옵션의 인덱스
 *
 */

export default function SelectList({
  isOpen,
  options,
  onSelect,
  selectedValue,
  focusedIndex,
}: SelectListProps) {
  return (
    <div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg"
          role="listbox"
        >
          {options.map((option, index) => (
            <SelectOption
              key={option.value}
              value={option.value}
              label={option.label}
              onSelect={onSelect}
              isSelected={option.value === selectedValue}
              isFocused={index === focusedIndex}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
