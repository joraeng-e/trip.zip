import useClickOutside from '@/hooks/useClickOutside';
import { getUser } from '@/libs/api/user';
import { BaseProfile } from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

import { notify } from '../../Toast';
import Notification from './Notification';

export default function LoggedInHeader() {
  const [isProfileBoxVisible, setIsProfileBoxVisible] = useState(false);

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUser,
    staleTime: 0,
  });

  const handleProfileClick = () => {
    setIsProfileBoxVisible(!isProfileBoxVisible);
  };

  const router = useRouter();

  const logout = () => {
    notify('success', '로그아웃 되었습니다!');
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('isSocialUser');
    router.push('/');
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsProfileBoxVisible(false));

  return (
    <div className="relative flex items-center gap-16">
      <Notification />
      <div
        className="flex cursor-pointer items-center gap-6 border-l-2 pl-16"
        onClick={handleProfileClick}
        ref={dropdownRef}
      >
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
        {isProfileBoxVisible && (
          <motion.div
            className="absolute right-0 top-50 z-10 h-fit w-fit cursor-pointer rounded-md border-2 border-custom-gray-200 bg-white p-4 shadow-md md:bottom-135 md:right-0 md:w-110 dark:bg-custom-black dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-2 right-20 rotate-90">
              <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-b-[11px] border-l-[11px] border-b-custom-gray-200 border-l-transparent" />
              <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-l-[11px] border-t-[11px] border-l-transparent border-t-custom-gray-200" />
            </div>
            <Link href="/mypage">
              <p className="rounded-md p-4 text-center text-md-medium transition-all hover:bg-custom-gray-300 dark:hover:bg-custom-gray-800">
                마이페이지
              </p>
            </Link>
            <hr className="my-2 border border-gray-200" />
            <p
              className="rounded-md p-4 text-center text-md-medium transition-all hover:bg-custom-gray-300 dark:hover:bg-custom-gray-800"
              onClick={logout}
            >
              로그아웃
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
