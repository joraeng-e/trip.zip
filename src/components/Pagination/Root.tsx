import { ReactNode, createContext, useContext } from 'react';

interface PaginationContextType {
  size: 'sm' | 'md';
}

const PaginationContext = createContext<PaginationContextType>({
  size: 'md',
});

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error('Pagination 컨텍스트를 호출할 수 없는 범위입니다.');
  }

  return context;
};

interface Props {
  children: ReactNode;
  size?: 'sm' | 'md';
}

export default function PaginationRoot({ children, size = 'md' }: Props) {
  const contextValue = {
    size,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      <div className="flex gap-10">{children}</div>
    </PaginationContext.Provider>
  );
}
