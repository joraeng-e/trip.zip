const CATEGORIES = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export default function CategoryMenu() {
  return (
    <div className="relative">
      <div className="no-scrollbar flex gap-8 overflow-x-auto md:gap-14 xl:gap-24">
        {CATEGORIES.map((each) => (
          <button
            key={each}
            type="button"
            className="flex-shrink-0 rounded-[15px] border border-custom-green-200 px-10 py-8 leading-26 text-custom-green-200 md:px-36 md:py-16 md:text-18 xl:px-48"
          >
            {each}
          </button>
        ))}
        <div className="ml-16"></div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-50 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
