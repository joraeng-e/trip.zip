import useClickOutside from '@/hooks/useClickOutside';
import { ArrowDown } from '@/libs/utils/Icon';
import React, { useRef, useState } from 'react';

import SelectList from './SelectList';

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

/**
 * Select 컴포넌트
 *
 * 키보드 네비게이션이 가능해요
 * (방향키와 엔터로 옵션 선택)
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - 현재 선택된 옵션의 값
 * @param {function} props.onChange - 선택 변경 시 호출될 함수. React.ChangeEvent<HTMLSelectElement>를 인자로 받습니다.
 * @param {Array<{value: string, label: string}>} props.options - 선택 가능한 옵션들의 배열
 * @param {string} props.placeholder - 선택되지 않았을 때 표시될 텍스트
 * @param {string} [props.error] - 에러 메시지. 존재할 경우 에러 상태로 표시됩니다.
 * @param {string} [props.maxWidth] - 컴포넌트의 최대 너비
 *
 * @example
 * // 저는 옵션 따로 빼줬어요
 * <Select
 *   value={selectedValue}
 *   onChange={handleChange}
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   placeholder="카테고리"
 *   error="카테고리를 선택해주세요"
 *   maxWidth="300px"
 * />
 *
 */

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
  maxWidth,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string) => {
    onChange({
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown'
      ) {
        setIsOpen(true);
        setFocusedIndex(0);
        event.preventDefault();
      }
    } else {
      switch (event.key) {
        case 'ArrowDown':
          setFocusedIndex((prevIndex) =>
            Math.min(prevIndex + 1, options.length - 1),
          );
          event.preventDefault();
          break;
        case 'ArrowUp':
          setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          event.preventDefault();
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          }
          event.preventDefault();
          break;
      }
    }
  };

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  });

  return (
    <div ref={containerRef} style={{ maxWidth, position: 'relative' }}>
      <div
        className={`basic-input w-full ${
          error ? 'border-red-400' : ''
        } flex cursor-pointer items-center justify-between ${
          value ? 'text-black' : 'text-gray-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
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
      <SelectList
        isOpen={isOpen}
        options={options}
        onSelect={handleSelect}
        selectedValue={value}
        focusedIndex={focusedIndex}
      />
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">{error}</p>
      )}
    </div>
  );
}
