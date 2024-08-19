import Image from 'next/image';

interface ThumbnailImageProps {
  src: string;
  alt: string;
  onClick: () => void;
  className?: string;
}

export default function ThumbnailImage(props: ThumbnailImageProps) {
  const { src, alt, className, onClick } = props;
  return (
    <div
      className={`relative h-60 w-60 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        className="rounded-lg object-cover"
      />
    </div>
  );
}
