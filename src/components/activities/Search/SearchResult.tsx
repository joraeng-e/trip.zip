export default function SearchResult({
  keyword,
  totalCount,
}: {
  keyword: string;
  totalCount?: number;
}) {
  return (
    <>
      <h1 className="mt-24 text-24 leading-28 md:text-32 xl:mt-40">
        <span className="font-bold dark:text-white">{keyword}</span>으로 검색한
        결과입니다.
      </h1>
      <span className="mb-16 mt-12 block leading-26 md:mb-24 dark:text-white">
        총 {totalCount ?? 0}개의 결과
      </span>
    </>
  );
}
