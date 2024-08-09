import { useEffect, useRef, useState } from 'react';

import BlurBannerImage from './BlurBannerImage';
import ImageCounter from './ImageCounter';
import ImageNavButton from './ImageNavButton';
import ThumbnailImage from './ThumbnailImage';

interface MobileImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function MobileBannerImage(props: MobileImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;
  const images = [bannerImageUrl, ...(subImageUrl || [])];
  const totalImages = images.length;
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

  return (
    <div className="my-16 flex flex-col md:hidden">
      <div
        className={`relative flex h-310 w-full items-center justify-center overflow-hidden ${className}`}
      >
        <BlurBannerImage
          src={images[currentIndex]}
          alt={`image-${currentIndex}`}
        />
        <ImageNavButton direction="left" onClick={prevImage} />
        <ImageNavButton direction="right" onClick={nextImage} />
        <ImageCounter currentIndex={currentIndex} totalImages={totalImages} />
      </div>
      <div
        ref={thumbnailRef}
        className="mx-16 mt-16 flex cursor-pointer space-x-8 overflow-x-hidden"
      >
        {images.map((img, index) => (
          <div className="mt-10 h-80 w-60 flex-none" key={index}>
            <ThumbnailImage
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`${currentIndex === index ? 'rounded-lg outline outline-2 outline-custom-blue-300' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
