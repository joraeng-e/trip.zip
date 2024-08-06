import { KebabIcon, StarOnIcon } from '@/libs/utils/Icon';
import Image from 'next/image';

interface MyCardProps {
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
}

export default function MyCard({
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  price,
}: MyCardProps) {
  return (
    <div className="mb-16 flex h-[153px] max-w-[800px] overflow-hidden rounded-lg shadow-md hover:bg-gray-100 lg:h-[204px]">
      <div className="relative size-[153px] h-full flex-shrink-0 lg:size-[204px]">
        <Image
          src={bannerImageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-4 flex items-center">
              <StarOnIcon className="mr-4 h-16 w-16 text-yellow-400" />
              <span className="text-sm">
                {rating} ({reviewCount})
              </span>
            </div>
            <h3 className="text-2lg-bold lg:text-xl-bold">{title}</h3>
          </div>
          <div>
            <button className="text-gray-400 hover:text-gray-600">
              <KebabIcon />
              {/* TODO: 수정,삭제 토글 추가 */}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-xl-medium font-bold text-gray-900">
            ₩{price.toLocaleString()}
          </p>
          <span className="ml-4 text-lg-medium text-custom-gray-800">/인</span>
        </div>
      </div>
    </div>
  );
}
