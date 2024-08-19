import React, { TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  maxWidth?: string;
  height?: string;
  onBlur?: () => void;
};

/**
 * Textarea 컴포넌트
 * @param {string} label - 텍스트영역의 레이블
 * @param {UseFormRegisterReturn} register - react-hook-form의 register 함수 반환값
 * @param {FieldError} [error] - 텍스트영역의 에러 정보 (선택적)
 * @param {string} [maxWidth='640px'] - (반응형을 위한)입력 필드 컨테이너의 최대 너비. 기본값 640px
 * @param {string} [height='346px'] - (반응형을 위한)입력 필드의 높이. 기본값 346px
 * @returns {JSX.Element} - 렌더링된 Textarea 컴포넌트
 * @example
 * const {
 *   register,
 *   handleSubmit,
 *   formState: { errors },
 * } = useForm<FormData>({
 *   resolver: yupResolver(schema),
 * });
 *
 * const onSubmit: SubmitHandler<FormData> = (data) => {
 *   console.log('폼 제출', data);
 * };
 *
 * <Textarea
 *   label="내용"
 *   name="content"
 *   placeholder="내용을 입력해주세요"
 *   register={register('content')}
 *   error={errors.content}
 *  onBlur={() => trigger('content')}
 * />
 *
 * @author 김보미
 */

export default function Textarea({
  label,
  register,
  error,
  maxWidth = '640px',
  height = '346px',
  onBlur,
  ...props
}: TextareaProps) {
  const { name, placeholder } = props;

  return (
    <div className="relative flex w-full flex-col gap-2" style={{ maxWidth }}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register}
        onBlur={onBlur}
        className={`dark-base resize-none rounded-md border-2 p-16 outline-none focus:border-custom-green-200 ${error ? 'border-red-400' : ''}`}
        style={{ height }}
        {...props}
      />
      {error && (
        <p className="pl-8 text-xs-regular text-custom-red-200">
          {error.message}
        </p>
      )}
    </div>
  );
}
