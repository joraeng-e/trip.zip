import { createContext, useContext, useState } from 'react';

import { NextButton, PageList, PrevButton } from './Buttons';

interface PaginationContextType {
  totalPages: number;
  currentPage: number;
  handleCurrentPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextType>({
  totalPages: 1,
  currentPage: 1,
  handleCurrentPage: () => {},
});

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

export default function Pagination({
  onPageChange,
  totalPages,
  initialPage = 1,
}: Props) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const contextValue = {
    totalPages,
    currentPage,
    handleCurrentPage,
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
