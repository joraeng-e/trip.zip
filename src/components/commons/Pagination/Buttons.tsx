import { PaginationArrowLeft, PaginationArrowRight } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import { useCallback, useEffect, useState } from 'react';

import { usePaginationContext } from '.';

export function PrevButton() {
  const { handlePageChange, currentPage } = usePaginationContext();
  const [disabled, setDisabled] = useState(currentPage === 1);

  const handlePrevClick = () => {
    if (currentPage <= 1) return;
    handlePageChange(currentPage - 1);
  };

  useEffect(() => {
    setDisabled(currentPage <= 1);
  }, [currentPage]);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="prev"
      className="flex-center size-40 rounded-[15px] border border-custom-green-200 bg-white hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-custom-gray-300 disabled:hover:bg-white md:size-55"
      onClick={handlePrevClick}
    >
      <div className="size-15 md:size-21">
        <PaginationArrowLeft
          width="100%"
          height="100%"
          fill={disabled ? '#A1A1A1' : '#0B3B2D'}
        />
      </div>
    </button>
  );
}

export function NextButton() {
  const { handlePageChange, currentPage, totalPages } = usePaginationContext();
  const [disabled, setDisabled] = useState(currentPage === totalPages);

  const handleNextClick = () => {
    if (currentPage >= totalPages) return;
    handlePageChange(currentPage + 1);
  };

  useEffect(() => {
    setDisabled(currentPage >= totalPages);
  }, [currentPage, totalPages]);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="next"
      onClick={handleNextClick}
      className="flex-center size-40 rounded-[15px] border border-custom-green-200 bg-white hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-custom-gray-300 disabled:hover:bg-white md:size-55"
    >
      <div className="size-15 md:size-21">
        <PaginationArrowRight
          width="100%"
          height="100%"
          fill={disabled ? '#A1A1A1' : '#0B3B2D'}
        />
      </div>
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
        <PageItem key={page} page={page} />
      ))}
    </>
  );
}

function PageItem({ page }: { page: number }) {
  const { currentPage, handlePageChange } = usePaginationContext();

  const handlePageItemClick = () => {
    handlePageChange(page);
  };

  const classnames = classNames(
    'flex-center rounded-[15px] size-40 md:size-55',
    {
      'bg-custom-green-200 text-white hover:bg-[#0b553e]': currentPage === page,
      'bg-white hover:bg-gray-100 border border-custom-green-200':
        currentPage !== page,
    },
  );

  return (
    <button type="button" className={classnames} onClick={handlePageItemClick}>
      {page}
    </button>
  );
}
