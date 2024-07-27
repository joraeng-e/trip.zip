import { PasswordOffIcon, PasswordOnIcon } from '@/libs/utils/Icon';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type PasswordInputProps = {
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

/**
 * 비밀번호 입력 필드 컴포넌트로, 비밀번호 표시/숨기기 기능을 포함합니다.
 *
 * @param {string} name - 입력 필드의 이름
 * @param {string} placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param {UseFormRegisterReturn} register - react-hook-form의 register 함수 반환값
 * @param {FieldError} [error] - 입력 필드의 에러 정보 (선택적)
 * @returns {JSX.Element} - 렌더링된 PasswordInput 컴포넌트
 *
 *
 * @author 김보미
 */

export default function PasswordInput({
  name,
  placeholder,
  register,
  error,
}: PasswordInputProps) {
  const [isVisibilityIcon, setIsVisibilityIcon] = useState(false);

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  return (
    <>
      <input
        type={isVisibilityIcon ? 'text' : 'password'}
        id={name}
        placeholder={placeholder}
        {...register}
        className={`h-58 rounded-md border-2 px-16 outline-none focus:border-custom-green-200 ${error && 'border-red-400'}`}
      />
      {isVisibilityIcon ? (
        <PasswordOffIcon
          width={24}
          height={24}
          className="absolute right-20 top-42 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <PasswordOnIcon
          width={24}
          height={24}
          className="absolute right-20 top-42 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      )}
    </>
  );
}
