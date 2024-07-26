import classNames from '@/libs/utils/classNames';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { usePaginationContext } from '.';

// TODO: svg 컴포넌트로 변경(disabled 스타일 추가)
export function PrevButton() {
  const [disabled, setDisabled] = useState(false);
  const { handleCurrentPage, currentPage } = usePaginationContext();

  const handlePrevClick = () => {
    if (currentPage === 1) return;
    handleCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setDisabled(currentPage === 1);
  }, [currentPage]);

  return (
    <button
      type="button"
      disabled={disabled}
      className="flex size-40 items-center justify-center rounded-[15px] border border-custom-green-200 bg-white hover:bg-gray-100 disabled:border-custom-gray-300 md:size-55"
      onClick={handlePrevClick}
    >
      <Image
        src={'/icon/paginationArrowLeft.svg'}
        width={21}
        height={21}
        alt="prev"
      />
    </button>
  );
}

export function NextButton() {
  const [disabled, setDisabled] = useState(false);
  const { handleCurrentPage, currentPage, totalPages } = usePaginationContext();

  const handleNextClick = () => {
    if (currentPage === totalPages) return;
    handleCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setDisabled(currentPage === totalPages);
  }, [currentPage]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleNextClick}
      className="flex size-40 items-center justify-center rounded-[15px] border border-custom-green-200 bg-white hover:bg-gray-100 disabled:border-custom-gray-300 md:size-55"
    >
      <Image
        src={'/icon/paginationArrowRight.svg'}
        width={21}
        height={21}
        alt="prev"
      />
    </button>
  );
}

export function PageList() {
  const { currentPage, totalPages } = usePaginationContext();

  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const MAXPAGE_TO_SHOW = 5;

    let startPage = Math.max(
      1,
      Number(currentPage) - Math.floor(MAXPAGE_TO_SHOW / 2),
    );
    const endPage = Math.min(totalPages, startPage + MAXPAGE_TO_SHOW - 1);

    if (endPage - startPage < MAXPAGE_TO_SHOW - 1) {
      startPage = Math.max(1, endPage - MAXPAGE_TO_SHOW + 1);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  const pageNumbers = getPageNumbers();

  return (
    <>
      {pageNumbers.map((page) => (
        <PageItem key={page} number={page} />
      ))}
    </>
  );
}

function PageItem({ number }: { number: number }) {
  const { currentPage, handleCurrentPage } = usePaginationContext();

  const handleNumberClick = () => {
    handleCurrentPage(number);
  };

  const classnames = classNames(
    'flex items-center justify-center rounded-[15px] size-40 md:size-55',
    {
      'bg-custom-green-200 text-white hover:bg-[#0b553e]':
        currentPage === number,
      'bg-white hover:bg-gray-100 border border-custom-green-200':
        currentPage !== number,
    },
  );

  return (
    <button type="button" className={classnames} onClick={handleNumberClick}>
      {number}
    </button>
  );
}
