import Pagination from '@/components/Pagination';

export default function Test() {
  return (
    <>
      <Pagination.Root>
        <Pagination.PrevButton />
        <Pagination.Numbers />
        <Pagination.NextButton />
      </Pagination.Root>
    </>
  );
}
