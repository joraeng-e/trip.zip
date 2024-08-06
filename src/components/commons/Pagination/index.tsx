import { createContext, useContext, useEffect } from 'react';

import { NextButton, PageList, PrevButton } from './Buttons';

interface PaginationContextType {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
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
  handlePageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
}

/**
 * @example
 * ```tsx
 * export default function PaginationExample() {
 *  const [page, setPage] = useState(1);
 *
 *  const handlePageChange = (page: number) => {
 *    setPage(page);
 *  }
 *
 *  return (
 *    <>
 *      <Pagination handlePageChange={handlePageChange} totalPages={10} currentPage={page} />
 *    </>
 *  )
 * }
 * ```
 *
 * @property {function} handlePageChange - 현재 페이지가 변경되었을 때 실행될 함수
 * @property {number} totalPages - 전체 페이지 개수
 * @property {number} currentPage - 현재 페이지
 * @author 천권희
 */

export default function Pagination({
  handlePageChange,
  totalPages,
  currentPage,
}: Props) {
  const contextValue = {
    totalPages,
    currentPage,
    handlePageChange,
  };

  useEffect(() => {
    if (totalPages < currentPage) handlePageChange(totalPages);
    if (currentPage <= 0) handlePageChange(1);
  }, [currentPage, totalPages]);

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
