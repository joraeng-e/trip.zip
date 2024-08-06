import Image from 'next/image';

interface ImageProps {
  bannerImageUrl: string;
  subImageUrl?: string[];
  className?: string;
}

export default function BannerImage(props: ImageProps) {
  const { bannerImageUrl, subImageUrl, className } = props;

  return (
    <div className={`grid grid-cols-1 gap-2 md:grid-cols-2 ${className}`}>
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
            // 1번과 3번 이미지에 대해 다른 rounded 스타일을 적용
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
    </div>
  );
}
