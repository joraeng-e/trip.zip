import { passwordOffIcon, passwordOnIcon } from '@/libs/utils/Icon';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputProps = {
  label: string;
  name: string;
  type?: 'text' | 'password';
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
      {type === 'text' ? (
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          {...register}
          className={`h-[58px] rounded-[6px] border-2 px-4 outline-none ${error && 'border-red-400'}`}
        />
      ) : (
        <>
          <input
            type={isVisibilityIcon ? 'text' : 'password'}
            id={name}
            placeholder={placeholder}
            {...register}
            className={`h-[58px] rounded-[6px] border-2 px-4 outline-none ${error && 'border-red-400'}`}
          />
          <Image
            src={isVisibilityIcon ? passwordOffIcon : passwordOnIcon}
            width={24}
            height={24}
            alt="password"
            className="absolute right-4 top-12 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </>
      )}
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
}
