import { PasswordOffIcon, PasswordOnIcon } from '@/libs/utils/Icon';
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type PasswordInputProps = {
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

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
