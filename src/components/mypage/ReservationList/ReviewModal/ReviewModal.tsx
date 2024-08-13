import { XIcon } from '@/libs/utils/Icon';

import Rating from './Rating';

export default function ReviewModal() {
  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full max-w-full overflow-y-auto bg-white px-24 py-35">
      <div className="flex h-full flex-col gap-35 border-1 border-red-400">
        <div className="flex items-center justify-between">
          <span className="text-28 font-bold text-custom-black">후기작성</span>
          <XIcon className="size-48" />
        </div>
        <form className="flex h-full flex-col gap-12">
          <div className="flex gap-8">
            <div className="size-100 rounded-xl bg-red-400">이미지</div>
            <div className="flex flex-col gap-6">
              <span className="text-16 font-bold text-nomad-black">
                함께 배우면 즐거운 스트릿 댄스
              </span>
              <span className="text-14 font-normal text-nomad-black">
                2023.2.14. 11:00 - 12:30. 10명
              </span>
              <hr />
              <span className="text-20 font-bold text-nomad-black">
                ₩10,000
              </span>
            </div>
          </div>
          <div className="flex-center h-100 w-full">
            <Rating starSize={50} />
          </div>
          <textarea className="h-full flex-1 border-1 border-custom-gray-700" />
          <button className="mt-12 h-54 bg-red-300" type="submit">
            작성하기
          </button>
        </form>
      </div>
    </div>
  );
}
