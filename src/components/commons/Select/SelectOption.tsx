import React from 'react';

interface SelectOptionProps {
  value: string;
  label: string;
  onSelect: (value: string) => void;
  isSelected: boolean;
  isFocused: boolean;
}

/**
 * SelectOption 컴포넌트
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - 옵션의 값
 * @param {string} props.label - 옵션에 표시될 레이블
 * @param {function} props.onSelect - 옵션 선택 시 호출될 함수. 선택된 value를 인자로 받습니다.
 * @param {boolean} props.isSelected - 현재 옵션이 선택되었는지 여부
 * @param {boolean} props.isFocused - 현재 옵션이 포커스 되었는지 여부
 *
 *
 */

export default function SelectOption({
  value,
  label,
  onSelect,
  isSelected,
  isFocused,
}: SelectOptionProps) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={`cursor-pointer p-10 pl-12 ${
        isFocused ? 'bg-gray-100' : 'bg-white'
      } ${isSelected ? 'font-bold' : ''} hover:bg-gray-100`}
      onClick={() => onSelect(value)}
    >
      {label}
    </div>
  );
}
