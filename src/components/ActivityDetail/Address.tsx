import { PaperPlaneIcon } from '@/libs/utils/Icon';
import React from 'react';

import KakaoMap from '../commons/KakaoMap';

interface AddressProps {
  address: string;
}

export default function Address({ address }: AddressProps) {
  return (
    <div>
      <div className="h-500 w-500">
        <KakaoMap address={address} />
      </div>
      <div>
        <PaperPlaneIcon />
        {address}
      </div>
    </div>
  );
}
