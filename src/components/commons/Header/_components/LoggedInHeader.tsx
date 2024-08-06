import tripzipFavicon from '@/../public/logo/tripzipFavicon.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Notification from './Notification';

export default function LoggedInHeader() {
  return (
    <div className="relative flex items-center gap-16">
      <Notification />
      <Link href="/mypage" className="flex items-center gap-6 border-l-2 pl-16">
        <div className="h-40 w-40 overflow-hidden rounded-full border">
          <Image
            src={tripzipFavicon}
            alt="trip.zip"
            className="object-cover"
            width={40}
            height={40}
          />
        </div>
        <p className="font-semibold">김루피</p>
      </Link>
    </div>
  );
}
