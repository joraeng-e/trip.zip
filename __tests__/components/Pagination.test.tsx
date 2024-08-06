import Pagination, {
  usePaginationContext,
} from '@/components/commons/Pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

describe('Pagination Component', () => {
  it('usePaginationContext 호출 범위 테스트', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const TestComponent = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _context = usePaginationContext();
      return <></>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'Pagination 컨텍스트를 호출할 수 없는 범위입니다.',
    );

    console.error = originalError;
  });

  it('페이지네이션 컴포넌트 마운트 시 1페이지 활성화', () => {
    render(<PaginationTest totalPages={10} currentPage={1} />);

    expect(screen.getByText('1')).toHaveClass('bg-custom-green-200');
  });

  it('initial page 테스트', () => {
    render(<PaginationTest totalPages={10} currentPage={7} />);

    expect(screen.getByText('7')).toHaveClass('bg-custom-green-200');
  });

  test('initial page가 total page 보다 큰 경우', () => {
    render(<PaginationTest totalPages={10} currentPage={11} />);

    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(screen.getByText('10')).toHaveClass('bg-custom-green-200');
    expect(nextButton).toBeDisabled();
  });

  it('initial page가 0, 음수인 경우', () => {
    render(<PaginationTest totalPages={10} currentPage={-1} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });

    expect(screen.getByText('1')).toHaveClass('bg-custom-green-200');
    expect(prevButton).toBeDisabled();
  });

  it('initial page에 의한 페이지 리스트가 의도하는 대로 보여지는지 테스트', () => {
    render(<PaginationTest totalPages={10} currentPage={7} />);
    const pageNumbers = [5, 6, 7, 8, 9];

    pageNumbers.forEach((pageNumber) => {
      expect(screen.getByText(pageNumber)).toBeInTheDocument();
    });

    expect(screen.queryByText(4)).not.toBeInTheDocument();
    expect(screen.queryByText(10)).not.toBeInTheDocument();
  });

  it('prev button disabled test', () => {
    render(<PaginationTest totalPages={10} currentPage={1} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it('next button disabled test', () => {
    render(<PaginationTest totalPages={10} currentPage={10} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('prev button click test', () => {
    render(<PaginationTest totalPages={10} currentPage={4} />);

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(screen.getByText('3')).toHaveClass('bg-custom-green-200');
  });

  it('next button click test', () => {
    render(<PaginationTest totalPages={10} currentPage={4} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getByText('6')).toHaveClass('bg-custom-green-200');
  });

  it('page button click test', () => {
    render(<PaginationTest totalPages={10} currentPage={4} />);

    const pageButton = screen.getByText('6');
    fireEvent.click(pageButton);

    expect(pageButton).toHaveClass('bg-custom-green-200');
  });
});

function PaginationTest({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination
      currentPage={page}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
    />
  );
}
