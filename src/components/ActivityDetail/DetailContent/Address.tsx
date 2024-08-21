import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';

import KakaoMap from '../../commons/KakaoMap';

interface AddressProps {
  address: string;
}

export default function Address({ address }: AddressProps) {
  const handleClickClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('주소가 클립보드에 복사되었습니다!');
    });
  };

  return (
    <>
      <hr className="contour" />
      <div className="m-16">
        <h2 className="dark-base mb-16 mt-20 text-xl-bold text-nomad-black">
          위치
        </h2>
      </div>

      <KakaoMap address={address} className="h-450 w-full" />
      <div className="m-16">
        <div
          className="flex cursor-pointer items-center gap-12 text-md-regular text-custom-black"
          onClick={handleClickClipboard}
        >
          <FaLocationDot className="dark:text-white" />
          <div className="dark-base">{address}</div>
        </div>
      </div>
    </>
  );
}
