import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import BaseModal from '../BaseModal';
import ImageCounter from './ImageCounter';
import ImageNavButton from './ImageNavButton';
import ThumbnailImage from './ThumbnailImage';

interface BannerImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export default function BannerImageModal(props: BannerImageModalProps) {
  const { isOpen, onClose, images } = props;
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
    <BaseModal isOpen={isOpen} onClose={onClose} className="mx-40 h-820">
      <div className="relative mt-80 flex h-700 w-auto items-center justify-center overflow-hidden">
        <div className="h-700 w-1200">
          <Image
            src={images[currentIndex]}
            alt={`image-${currentIndex}`}
            fill
            className="relative rounded-lg object-contain"
          />
          <ImageNavButton direction="left" onClick={prevImage} />
          <ImageNavButton direction="right" onClick={nextImage} />
        </div>
        <ImageCounter currentIndex={currentIndex} totalImages={totalImages} />
      </div>

      <div
        ref={thumbnailRef}
        className="mx-16 mt-16 flex cursor-pointer space-x-8 overflow-x-hidden"
      >
        {images.map((img, index) => (
          <div className="my-10 mb-20 ml-4 w-80 flex-none" key={index}>
            <ThumbnailImage
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-80 w-80 ${currentIndex === index ? 'rounded-lg outline outline-2 outline-custom-blue-300' : ''}`}
            />
          </div>
        ))}
      </div>
    </BaseModal>
  );
}
