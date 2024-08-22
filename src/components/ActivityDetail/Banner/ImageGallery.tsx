import Image from 'next/image';
import { useRef } from 'react';

import ImageCounter from './ImageCounter';
import ImageNavButton from './ImageNavButton';
import ThumbnailImage from './ThumbnailImage';

interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
}

export default function ImageGallery(props: ImageGalleryProps) {
  const { images, currentIndex, setCurrentIndex, nextImage, prevImage } = props;

  const thumbnailRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative mt-80 flex h-700 w-auto items-center justify-center overflow-hidden">
        <div className="h-700 w-1200">
          <Image
            src={images[currentIndex]}
            alt={`Image-${currentIndex}`}
            fill
            className="relative rounded-lg object-contain"
          />
          <ImageNavButton direction="left" onClick={prevImage} />
          <ImageNavButton direction="right" onClick={nextImage} />
        </div>
        <ImageCounter currentIndex={currentIndex} totalImages={images.length} />
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
    </>
  );
}
