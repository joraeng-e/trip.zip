import { IoMdImages } from 'react-icons/io';

export default function BannerButton() {
  return (
    <div className="dark-base dark-border absolute bottom-40 right-40 flex h-40 w-140 items-center justify-center gap-10 rounded-3xl border border-custom-gray-400 bg-white text-center text-md-regular transition hover:bg-custom-gray-800 hover:text-white">
      <IoMdImages className="h-16 w-16" />
      <span>사진 전체 보기</span>
    </div>
  );
}
