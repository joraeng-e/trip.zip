import NoImage from '@/../public/imgs/no-img.png';
import Image from 'next/image';
import { useState } from 'react';

import ImageModal from './BannerImageModal';
import BlurBannerImage from './BlurBannerImage';

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

  const Images = [bannerImageUrl, ...(subImageUrl || [])];

  const commonImageClass =
    'object-cover transition duration-300 group-hover:brightness-75';
  const commonContainerClass = 'group relative h-500 w-full';
  const smallImageClass = 'group relative h-250 w-full';

  return (
    <div className="hidden pt-10 md:block">
      {subImageUrl && subImageUrl.length === 0 ? (
        <div
          className={`relative flex h-500 w-full items-center justify-center overflow-hidden rounded-xl ${className}`}
        >
          <BlurBannerImage src={bannerImageUrl} alt="banner" />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-2 md:grid-cols-2 ${className} relative`}
        >
          <div className={commonContainerClass}>
            <Image
              src={bannerImageUrl}
              alt="banner"
              fill
              className={`rounded-l-xl ${commonImageClass}`}
            />
          </div>

          {subImageUrl && subImageUrl.length === 1 && (
            <div className="col-span-1 grid grid-cols-1 gap-2">
              <div className={commonContainerClass}>
                <Image
                  src={subImageUrl[0]}
                  alt="sub-image-0"
                  fill
                  className={`rounded-r-xl ${commonImageClass}`}
                />
              </div>
            </div>
          )}

          {subImageUrl && subImageUrl.length === 2 && (
            <div className="col-span-1 grid grid-cols-1 gap-2">
              <div className={commonContainerClass}>
                <Image
                  src={subImageUrl[0]}
                  alt="sub-image-0"
                  fill
                  className={`rounded-r-xl ${commonImageClass}`}
                />
              </div>
            </div>
          )}

          {subImageUrl && subImageUrl.length === 3 && (
            <div className="col-span-1 grid grid-cols-2 gap-2">
              {subImageUrl.slice(0, 3).map((url, index) => (
                <div key={index} className={smallImageClass}>
                  <Image
                    src={url}
                    alt={`sub-image-${index}`}
                    fill
                    className={commonImageClass}
                  />
                </div>
              ))}
              <div className={smallImageClass}>
                <Image
                  src={NoImage}
                  alt="base-profile"
                  fill
                  className={`rounded-br-xl ${commonImageClass}`}
                />
              </div>
            </div>
          )}

          {subImageUrl && subImageUrl.length > 3 && (
            <div className="col-span-1 grid grid-cols-2 gap-2">
              {subImageUrl.slice(0, 4).map((url, index) => {
                const roundedClass =
                  index === 1
                    ? 'rounded-tr-xl'
                    : index === 3
                      ? 'rounded-br-xl'
                      : '';
                return (
                  <div key={index} className={smallImageClass}>
                    <Image
                      src={url}
                      alt={`sub-image-${index}`}
                      fill
                      className={`${commonImageClass} ${roundedClass}`}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={handleOpenModal}
            className="absolute bottom-20 right-20 h-40 w-120 rounded-3xl border border-custom-gray-400 bg-white text-md-regular transition hover:bg-custom-gray-800 hover:text-white"
          >
            사진 전체 보기
          </button>
          <div className="max-w-1200">
            <ImageModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              images={Images}
            />
          </div>
        </div>
      )}
    </div>
  );
}
