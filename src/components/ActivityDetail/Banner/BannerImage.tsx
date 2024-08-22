import NoImage from '@/../public/imgs/no-img.png';
import Modal from '@/components/commons/Modal';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import BannerButton from './BannerButton';
import BlurBannerImage from './BlurBannerImage';
import ImageGallery from './ImageGallery';

interface ImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function BannerImage(props: ImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;

  const Images = [bannerImageUrl, ...(subImageUrl || [])];

  const totalImages = Images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnailWidth = thumbnailRef.current.clientWidth / totalImages;
      const offset = currentIndex * thumbnailWidth - thumbnailWidth / 2;
      thumbnailRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [currentIndex, totalImages]);

  const commonImageClass =
    'object-cover transition duration-300 group-hover:brightness-75';
  const commonContainerClass = 'group relative h-500 w-full';
  const smallImageClass = 'group relative h-250 w-full';

  return (
    <div className="mb-32 mt-40 hidden md:block">
      {subImageUrl && subImageUrl.length === 0 ? (
        <div
          className={`relative flex h-500 w-full items-center justify-center overflow-hidden rounded-xl ${className}`}
        >
          <BlurBannerImage src={bannerImageUrl} alt="banner" />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-10 md:grid-cols-2 ${className} relative`}
        >
          <div className={`h-full ${commonContainerClass}`}>
            <Image
              src={bannerImageUrl}
              alt="banner"
              fill
              className={`rounded-l-xl ${commonImageClass}`}
            />
          </div>

          {subImageUrl && subImageUrl.length === 1 && (
            <div className="col-span-1 grid grid-cols-1 gap-10">
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
            <div className="col-span-1 grid grid-cols-1 gap-10">
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
            <div className="col-span-1 grid grid-cols-2 gap-10">
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
            <div className="col-span-1 grid grid-cols-2 gap-10">
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

          <Modal.Root>
            <Modal.Trigger>
              <BannerButton />
            </Modal.Trigger>
            <Modal.Content>
              <ImageGallery
                images={Images}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                nextImage={nextImage}
                prevImage={prevImage}
              />
            </Modal.Content>
          </Modal.Root>
        </div>
      )}
    </div>
  );
}
