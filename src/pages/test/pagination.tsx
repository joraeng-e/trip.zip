import Pagination from '@/components/Pagination';

export default function PaginationTest() {
  const onPageChange = (page: number) => {
    console.log({ page });
  };

  return (
    <>
      <Pagination onPageChange={onPageChange} totalPages={10} />
    </>
  );
}
