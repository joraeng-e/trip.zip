import { createContext, useContext, useState } from 'react';

import { NextButton, PageList, PrevButton } from './Buttons';

interface PaginationContextType {
  totalPages: number;
  currentPage: number;
  updateCurrentPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextType | null>(null);

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error('Pagination 컨텍스트를 호출할 수 없는 범위입니다.');
  }

  return context;
};

interface Props {
  onPageChange?: (page: number) => void;
  totalPages: number;
  initialPage?: number;
}

/**
 * @example
 * ```tsx
 * export default function PaginationExample() {
 *  const handlePageChange = (page: number) => {
 *    console.log({ page });
 *  }
 *
 *  return (
 *    <>
 *      <Pagination onPageChange={handlePageChange} totalPages={10} />
 *    </>
 *  )
 * }
 * ```
 *
 * @property {function} onPageChange - 현재 페이지가 변경되었을 때 실행될 함수
 * @property {number} totalPages - 전체 페이지 개수
 * @property {number} initialPage - 컴포넌트 마운트 시 페이지
 * @author 천권희
 */

export default function Pagination({
  onPageChange,
  totalPages,
  initialPage = 1,
}: Props) {
  const [currentPage, setCurrentPage] = useState(() => {
    if (totalPages < initialPage) return totalPages;
    if (initialPage <= 0) return 1;
    return initialPage;
  });

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const contextValue = {
    totalPages,
    currentPage,
    updateCurrentPage,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      <div className="flex gap-10">
        <PrevButton />
        <PageList />
        <NextButton />
      </div>
    </PaginationContext.Provider>
  );
}
