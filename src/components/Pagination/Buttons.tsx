import classNames from '@/libs/utils/classNames';
import Image from 'next/image';
import { ReactNode } from 'react';

import { usePaginationContext } from './Root';

// TODO: svg 컴포넌트로 변경(disabled 스타일 추가)
export function PaginationPrevButton() {
  const { size } = usePaginationContext();
  const disabled = true;

  const classnames = classNames(
    'flex items-center justify-center border border-custom-green-200 rounded-[15px] bg-white hover:bg-gray-100',
    {
      'size-55': size === 'md',
      'size-40': size === 'sm',
      'border-custom-green-200': !disabled,
      'border-custom-gray-300': disabled,
    },
  );

  return (
    <button type="button" className={classnames}>
      <Image
        src={'/icon/paginationArrowLeft.svg'}
        width={21}
        height={21}
        alt="prev"
      />
    </button>
  );
}

export function PaginationNextButton() {
  const { size } = usePaginationContext();
  const disabled = true;

  const classnames = classNames(
    'flex items-center justify-center border rounded-[15px] bg-white hover:bg-gray-100',
    {
      'size-55': size === 'md',
      'size-40': size === 'sm',
      'border-custom-green-200': !disabled,
      'border-custom-gray-300': disabled,
    },
  );

  return (
    <button type="button" className={classnames}>
      <Image
        src={'/icon/paginationArrowRight.svg'}
        width={21}
        height={21}
        alt="prev"
      />
    </button>
  );
}

function PaginationNumber({ children }: { children: ReactNode }) {
  const { size } = usePaginationContext();
  const active = true;

  const classnames = classNames(
    'flex items-center justify-center rounded-[15px]',
    {
      'size-55': size === 'md',
      'size-40': size === 'sm',
      'bg-custom-green-200 text-white hover:bg-[#0b553e]': active,
      'bg-white hover:bg-gray-100 border border-custom-green-200': !active,
    },
  );

  return (
    <button type="button" className={classnames}>
      {children}
    </button>
  );
}

export function PaginationNumbers() {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <PaginationNumber key={index}>{index + 1}</PaginationNumber>
      ))}
    </>
  );
}
