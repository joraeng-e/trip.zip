import classNames from '@/libs/utils/classNames';
import React from 'react';

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: string;
  maxWidth?: string;
}

/**
 * Select 컴포넌트
 *
 * @param {string} value - 현재 선택된 값입니다.
 * @param {function} onChange - 선택 값이 변경될 때 호출되는 함수입니다.
 * @param {Array} options - 선택 가능한 옵션 목록입니다. 각 옵션은 객체 형식이며, `value`와 `label` 속성을 가집니다.
 * @param {string} placeholder - 기본 선택지의 플레이스홀더 텍스트입니다.
 * @param {string} [error] - 에러 메시지 텍스트입니다. 에러가 있을 때만 표시됩니다.
 * @param {string} [maxWidth] - select 요소의 최대 너비를 설정합니다.
 *
 * @example
 * <Select
 *   value={selectedValue}
 *   onChange={handleChange}
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 *   placeholder="Select an option"
 *   error="This field is required."
 *   maxWidth="300px"
 * />
 *
 * @returns {JSX.Element} Select 컴포넌트
 */
export default function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
  maxWidth,
}: SelectProps) {
  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        className={`basic-input w-full ${error ? 'border-red-400' : ''}`}
        style={{ maxWidth }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">{error}</p>
      )}
    </div>
  );
}
