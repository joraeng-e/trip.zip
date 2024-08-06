import { getUser } from '@/libs/api/user';
import { BaseProfile, NotificationIcon } from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LoggedInHeader() {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
  });

  return (
    <div className="flex items-center gap-16">
      <div className="cursor-pointer" aria-label="알림">
        <NotificationIcon />
      </div>
      <Link href="/mypage" className="flex items-center gap-6 border-l-2 pl-16">
        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border">
          {userInfo?.profileImageUrl ? (
            <Image
              src={userInfo?.profileImageUrl}
              alt="trip.zip"
              className="h-full w-full object-cover"
              width={40}
              height={40}
            />
          ) : (
            <BaseProfile className="h-full w-full object-cover" />
          )}
        </div>
        <p className="font-semibold">{userInfo?.nickname}</p>
      </Link>
    </div>
  );
}
