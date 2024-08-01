import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import PasswordInput from './PasswordInput';

type InputProps = {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'number' | 'email';
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  maxWidth?: string;
  onBlur?: () => void;
  disabled?: boolean;
};

/**
 * @param {string} label - 입력 필드의 레이블
 * @param {string} name - 입력 필드의 이름
 * @param {'text' | 'password' | 'number' | 'email'} [type='text'] - 입력 필드의 타입
 * @param {string} placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param {UseFormRegisterReturn} register - react-hook-form의 register 함수 반환값
 * @param {FieldError} [error] - 입력 필드의 에러 정보
 * @param {string} [maxWidth='640px'] - 반응형을 위한 입력 필드 컨테이너의 최대 너비. 기본값 640px
 * @param {() => void} [onBlur] - 포커스 아웃 시 호출되는 함수
 * @returns {JSX.Element} - 렌더링된 Input 컴포넌트
 * @example
 * const { register, handleSubmit, formState: { errors }, onBlur } = useForm<FormData>({
 *   resolver: yupResolver(schema),
 * });
 *
 * const onSubmit: SubmitHandler<FormData> = (data) => {
 *   console.log('폼 제출', data);
 * };
 *
 * <Input
 *   label="이메일"
 *   name="email"
 *   type="text"
 *   placeholder="이메일을 입력해주세요"
 *   register={register('email')}
 *   error={errors.email}
 *   maxWidth="640px"
 *   onBlur={() => trigger('email')}
 * />
 */

export default function Input({
  label,
  name,
  type,
  placeholder,
  register,
  error,
  maxWidth = '640px',
  onBlur,
  disabled = false,
}: InputProps) {
  const [isVibrating, setIsVibrating] = useState(false);

  const handleBlur = () => {
    if (onBlur) onBlur();
    if (!error) return;
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 300);
  };

  return (
    <div className={`relative flex w-full flex-col gap-2`} style={{ maxWidth }}>
      <label htmlFor={name} className="mb-2 font-bold">
        {label}
      </label>
      {(type === 'text' || type === 'number' || type === 'email') && (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register}
          onBlur={handleBlur}
          disabled={disabled}
          className={`h-58 rounded-md border-2 px-16 outline-none focus:border-custom-green-200 ${isVibrating && 'animate-vibration'} ${error && 'border-red-400'} ${disabled && 'cursor-not-allowed'}`}
        />
      )}
      {type === 'password' && (
        <PasswordInput
          name={name}
          placeholder={placeholder}
          register={register}
          error={error}
          onBlur={handleBlur}
        />
      )}
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">
          {error.message}
        </p>
      )}
    </div>
  );
}
