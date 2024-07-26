import React from 'react';
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
  
 * <Textarea
    label="내용"
    name="content"
    placeholder="내용을 입력해주세요"
    register={register('price')}
    error={errors.password}
    />
 * TextareaProps 타입 정의
 * @typedef {Object} TextareaProps
 * @property {string} label - 텍스트영역의 레이블
 * @property {string} name - 텍스트영역의 이름
 * @property {string} placeholder - 텍스트영역의 플레이스홀더 텍스트
 * @property {UseFormRegisterReturn} register - react-hook-form의 register 함수 반환값
 * @property {FieldError} [error] - 텍스트영역의 에러 정보 (선택적)
 * @property {string} [maxWidth='640'] - (반응형을 위한)입력 필드 컨테이너의 최대 너비. 기본값 640px
 */

type TextareaProps = {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  maxWidth?: string;
};

export default function Textarea({
  label,
  name,
  placeholder,
  register,
  error,
  maxWidth = '640',
}: TextareaProps) {
  return (
    <div
      className={`relative flex w-full flex-col gap-2`}
      style={{ maxWidth: maxWidth }}
    >
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register}
        className={`h-346 resize-none rounded-md border-2 p-16 outline-none focus:border-custom-green-200 ${error && 'border-red-400'}`}
      />
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">
          {error.message}
        </p>
      )}
    </div>
  );
}
