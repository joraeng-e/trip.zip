import tripzipFavicon from '@/../public/logo/tripzipFavicon.png';
import useClickOutside from '@/hooks/useClickOutside';
import { useMediaQuery } from '@/hooks/useMediaQeury';
import { NotificationIcon } from '@/libs/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import NotificationPopup, {
  NotificationMobilePopup,
} from './NotificationPopup';

export default function LoggedInHeader() {
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const toggleNotificationPopup = () => {
    setIsNotificationPopupOpen((prev) => !prev);
  };

  const closePopup = () => {
    setIsNotificationPopupOpen(false);
  };

  useClickOutside(notificationRef, closePopup);

  return (
    <div className="relative flex items-center gap-16">
      <div
        className="cursor-pointer"
        aria-label="알림"
        onClick={toggleNotificationPopup}
      >
        <NotificationIcon />
      </div>
      {isNotificationPopupOpen && (
        <>
          {!isMobile ? (
            <NotificationPopup closePopup={closePopup} ref={notificationRef} />
          ) : (
            <NotificationMobilePopup closePopup={closePopup} />
          )}
        </>
      )}
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
