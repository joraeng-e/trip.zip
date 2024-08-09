import Image from 'next/image';
import { useEffect, useState } from 'react';

import ImageModal from './BannerImageModal';

interface ImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function BannerImage(props: ImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 바깥 스크롤 비활성화
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const Images = [bannerImageUrl, ...(subImageUrl || [])];

  return (
    <div className="hidden pt-10 md:block">
      <div
        className={`grid grid-cols-1 gap-2 md:grid-cols-2 ${className} relative`}
      >
        {/* 배너 이미지: 전체 그리드 열 차지 */}
        <div className="group relative col-span-1 h-500 overflow-hidden md:col-span-1">
          <Image
            src={bannerImageUrl}
            alt="banner"
            fill
            className="rounded-l-xl object-cover transition duration-300 group-hover:brightness-75"
          />
        </div>

        {/* 서브 이미지: 오른쪽 절반 차지, 최대 4개 */}
        {subImageUrl && subImageUrl.length > 0 && (
          <div className="col-span-1 grid grid-cols-2 gap-2">
            {subImageUrl.slice(0, 4).map((url, index) => {
              const roundedClass =
                index === 1
                  ? 'rounded-tr-xl'
                  : index === 3
                    ? 'rounded-br-xl'
                    : '';

              return (
                <div key={index} className="group relative h-250 w-full">
                  <Image
                    src={url}
                    alt={`sub-image-${index}`}
                    fill
                    className={`object-cover transition duration-300 group-hover:brightness-75 ${roundedClass}`}
                  />
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleOpenModal}
          className="absolute bottom-20 right-20 h-40 w-120 rounded-3xl bg-white text-md-regular transition hover:bg-custom-gray-800 hover:text-white"
        >
          사진 모두 보기
        </button>
        <div className="max-w-1200">
          <ImageModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            images={Images}
          />
        </div>
      </div>
    </div>
  );
}
