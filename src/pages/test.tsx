import Header from '@/components/Header';
import KakaoMap from '@/components/KakaoMap';
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode';

const NONE_ADDRESS = '아직 주소 입력이 되지 않았습니다.';

export default function Test() {
  const [address, setAddress] = useState<string>('');

  const handleAddressSelect = (e: Address) => {
    setAddress(e.address);
  };

  return (
    <div>
      <Header />
      <main className="page-container bg-gray-500">
        <div className="text-xl-bold text-custom-orange-200"></div>
        <div className="h-500 w-500">
          <KakaoMap address={address} />
        </div>
        <div>{address ? address : NONE_ADDRESS}</div>
        <DaumPostcode onComplete={handleAddressSelect}></DaumPostcode>
      </main>
    </div>
  );
}
