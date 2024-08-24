import Button from '@/components/commons/Button';
import { BedIcon, SearchIcon } from '@/libs/utils/Icon';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SearchBox({
  initialKeyword,
  handleKeyword,
}: {
  initialKeyword?: string;
  handleKeyword: (keyword: string) => void;
}) {
  const [inputValue, setInputValue] = useState(initialKeyword || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // keyword를 모두 지울 경우 refetch
    if (!event.target.value) handleKeyword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleKeyword(inputValue);
  };

  return (
    <div className="dark-base dark-border rounded-2xl border-[1.5px] border-white bg-white px-24 py-16 shadow-xl md:px-24 md:py-35">
      <h1 className="text-16 font-bold leading-26 text-nomad-black dark:text-white md:text-20 md:leading-32">
        무엇을 체험하고 싶으신가요?
      </h1>

      <form
        onSubmit={handleSubmit}
        className="relative mt-15 flex h-56 gap-12 md:mt-20"
      >
        <div className="group relative flex-grow">
          <label
            htmlFor="activity-search"
            className="dark-base absolute -top-14 right-20 bg-white leading-26 text-custom-gray-800 group-focus-within:text-custom-green-200 dark:group-focus-within:text-white md:left-34 md:right-auto md:px-10 xl:left-40"
          >
            내가 원하는 체험은
          </label>
          <div className="absolute top-4">
            <BedIcon className="fill-custom-green-200 dark:fill-white" />
          </div>
          <input
            id="activity-search"
            type="text"
            onChange={handleInputChange}
            value={inputValue}
            placeholder="키워드를 입력하세요"
            className="dark-base dark-border h-full w-full rounded-[4px] border-[1.5px] border-custom-gray-700 pl-48 pr-12 text-14 text-nomad-black outline-none focus:border-[1.5px] focus:border-[#1e5920] md:text-16"
          />
        </div>

        <Button
          type="submit"
          className="hidden h-full max-w-96 rounded-md bg-nomad-black leading-26 text-white hover:bg-custom-green-200 md:block md:max-w-136"
        >
          검색하기
        </Button>

        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 transform p-12 md:hidden"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
