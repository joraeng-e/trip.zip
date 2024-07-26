import passwordOffIcon from '@/../public/icon/passwordOffIcon.svg';
import passwordOnIcon from '@/../public/icon/passwordOnIcon.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

/**
 * @example
 * const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('폼 제출', data);
  };
  
 * <Input
    label="이메일"
    name="email"
    type="text"
    placeholder="이메일을 입력해주세요"
    register={register('email')}
    error={errors.email}
  />
 * InputProps 타입 정의
 * @typedef {Object} InputProps
 * @property {string} label - 입력 필드의 레이블
 * @property {string} name - 입력 필드의 이름
 * @property {'text' | 'password' | 'number'} [type] - 입력 필드의 타입
 * @property {string} placeholder - 입력 필드의 플레이스홀더 텍스트
 * @property {UseFormRegisterReturn} register - react-hook-form의 register 함수 반환값
 * @property {FieldError} [error] - 입력 필드의 에러 정보
 * @author 김보미
 */

type InputProps = {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'number';
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export default function Input({
  label,
  name,
  type,
  placeholder,
  register,
  error,
}: InputProps) {
  const [isVisibilityIcon, setIsVisibilityIcon] = useState(false);

  const togglePasswordVisibility = () => {
    setIsVisibilityIcon(!isVisibilityIcon);
  };

  return (
    <div className="relative flex w-full max-w-[640px] flex-col gap-2">
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
          <Image
            src={isVisibilityIcon ? passwordOffIcon : passwordOnIcon}
            width={24}
            height={24}
            alt="password visibility toggle"
            className="absolute right-20 top-42 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </>
      ) : null}
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
