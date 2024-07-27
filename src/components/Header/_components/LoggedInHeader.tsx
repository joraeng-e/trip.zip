import { NotificationIcon } from '@/libs/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LoggedInHeader() {
  return (
    <div className="flex items-center gap-16">
      <div className="cursor-pointer" aria-label="알림">
        <NotificationIcon />
      </div>
      <Link href="/mypage" className="flex items-center gap-6 border-l-2 pl-16">
        <div className="h-40 w-40 overflow-hidden rounded-full border">
          <Image
            src="/logo/tripzipFavicon.png"
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
