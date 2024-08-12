import Image from 'next/image';
import React from 'react';

import EmptyImage from '/public/imgs/empty.png';

export default function NoActivity() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={EmptyImage} alt="빈 이미지" width={200} height={200} />
      <p className="mt-20 text-2xl-medium text-custom-gray-700">
        아직 등록한 체험이 없어요
      </p>
    </div>
  );
}
