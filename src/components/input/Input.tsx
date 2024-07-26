import { PasswordOffIcon, PasswordOnIcon } from '@/libs/utils/Icon';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

/**
 * 재사용 가능한 입력 컴포넌트로, 텍스트, 비밀번호, 숫자 타입을 지원합니다.
 * 비밀번호 필드에는 비밀번호 표시/숨기기 토글이 포함되어 있습니다.
 *
 * @example
 * ```jsx
 * const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
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
 * />
 * ```
 *
 * @typedef {Object} InputProps
 * @property {string} label - 입력 필드의 레이블
 * @property {string} name - 입력 필드의 이름
 * @property {'text' | 'password' | 'number'} [type='text'] - 입력 필드의 타입
 * @property {string} placeholder - 입력 필드의 플레이스홀더 텍스트
 * @property {UseFormRegisterReturn} register - react-hook-form의 register 함수 반환값
 * @property {FieldError} [error] - 입력 필드의 에러 정보
 * @property {string} [maxWidth='640px'] - (반응형을 위한)입력 필드 컨테이너의 최대 너비. 기본값 640px
 * @author 김보미
 */

type InputProps = {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'number';
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  maxWidth?: string;
};

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  maxWidth = '640px',
}: InputProps) {
  const [isVisibilityIcon, setIsVisibilityIcon] = useState(false);

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  return (
    <div
      className={`relative flex w-full flex-col gap-2`}
      style={{ maxWidth: maxWidth }}
    >
      <label htmlFor={name}>{label}</label>
      {type === 'text' || type === 'number' ? (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register}
          className={`h-58 rounded-md border-2 px-16 outline-none focus:border-custom-green-200 ${error && 'border-red-400'}`}
        />
      ) : type === 'password' ? (
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
      ) : null}
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">
          {error.message}
        </p>
      )}
    </div>
  );
}
