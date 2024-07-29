import { BedIcon } from '@/libs/utils/Icon';

export default function SearchBox() {
  return (
    <div className="relative -top-57 rounded-[16px] bg-white px-24 py-16 shadow-xl md:px-24 md:py-35">
      <h1 className="text-16 font-bold leading-26 text-nomad-black md:text-20 md:leading-32">
        무엇을 체험하고 싶으신가요?
      </h1>
      <div className="mt-15 flex h-56 gap-12 md:mt-20">
        <div className="relative flex-grow">
          <label
            htmlFor="activity-search"
            className="absolute -top-14 right-20 bg-white leading-26 text-custom-gray-800 md:left-34 md:right-auto md:px-10 xl:left-40"
          >
            내가 원하는 체험은
          </label>
          <div className="absolute top-4">
            <BedIcon />
          </div>
          <input
            id="activity-search"
            type="text"
            placeholder="키워드를 입력하세요"
            className="h-full w-full rounded-[4px] border border-custom-gray-700 pl-48 pr-12 text-14 text-nomad-black outline-none md:text-16"
          />
        </div>

        <button
          type="button"
          className="block h-full w-96 rounded-[4px] bg-nomad-black leading-26 text-white hover:bg-custom-green-200 md:w-136"
        >
          검색하기
        </button>
      </div>
    </div>
  );
}
