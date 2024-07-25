import { passwordOffIcon, passwordOnIcon } from '@/libs/utils/Icon';
import Image from 'next/image';
import React, { useState } from 'react';

type TextInputProps = {
  type?: 'text' | 'password';
  label: string;
  name: string;
  placeholder: string;
};

export default function TextInput({
  label,
  type,
  name,
  placeholder,
}: TextInputProps) {
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
          name={name}
          placeholder={placeholder}
          className="h-[58px] rounded-[6px] border-2 px-4 outline-none"
        />
      ) : (
        <>
          <input
            type={isVisibilityIcon ? 'text' : 'password'}
            id={name}
            name={name}
            placeholder={placeholder}
            className="h-[58px] rounded-[6px] border-2 px-4 outline-none"
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
    </div>
  );
}
