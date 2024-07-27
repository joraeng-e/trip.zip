import Device from '@/libs/constants/devices';
import { PaginationArrowLeft, PaginationArrowRight } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import { useCallback, useEffect, useState } from 'react';

import { usePaginationContext } from '.';

export function PrevButton() {
  const { updateCurrentPage, currentPage, deviceState } =
    usePaginationContext();
  const [disabled, setDisabled] = useState(currentPage === 1);

  const handlePrevClick = () => {
    if (currentPage === 1) return;
    updateCurrentPage(currentPage - 1);
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
      <PaginationArrowLeft
        width={deviceState === Device.Mobile ? 15 : 21}
        height={deviceState === Device.Mobile ? 15 : 21}
        fill={disabled ? '#A1A1A1' : '#0B3B2D'}
      />
    </button>
  );
}

export function NextButton() {
  const { updateCurrentPage, currentPage, totalPages, deviceState } =
    usePaginationContext();
  const [disabled, setDisabled] = useState(currentPage === totalPages);

  const handleNextClick = () => {
    if (currentPage === totalPages) return;
    updateCurrentPage(currentPage + 1);
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
      <PaginationArrowRight
        width={deviceState === Device.Mobile ? 15 : 21}
        height={deviceState === Device.Mobile ? 15 : 21}
        fill={disabled ? '#A1A1A1' : '#0B3B2D'}
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
        <PageItem key={page} page={page} />
      ))}
    </>
  );
}

function PageItem({ page }: { page: number }) {
  const { currentPage, updateCurrentPage } = usePaginationContext();

  const handlePageItemClick = () => {
    updateCurrentPage(page);
  };

  const classnames = classNames(
    'flex items-center justify-center rounded-[15px] size-40 md:size-55',
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
