import useClickOutside from '@/hooks/useClickOutside';
import { getMyNotifications } from '@/libs/api/myNotifications';
import { NotificationIcon } from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import { GetMyNotificationsResponse } from '@trip.zip-api';
import { useEffect, useRef, useState } from 'react';

import NotificationPopup from './NotificationPopup';

export default function Notification() {
  const { data } = useQuery<GetMyNotificationsResponse, Error>({
    queryKey: ['notifications', 'status'],
    queryFn: () => getMyNotifications({ size: 1 }),
    refetchInterval: 60_000,
    staleTime: 0,
  });

  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [previousTotalCount, setPreviousTotalCount] = useState(0);
  const [isNotificationUpdate, setIsNotificationUpdate] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleNotificationPopup = () => {
    setIsNotificationPopupOpen((prev) => !prev);
  };

  const closePopup = () => {
    setIsNotificationPopupOpen(false);
  };

  useClickOutside(notificationRef, closePopup);

  useEffect(() => {
    if (!data) return;

    const currentTotalCount = data.totalCount;

    if (currentTotalCount > previousTotalCount) {
      setIsNotificationUpdate(true);
      setTimeout(() => {
        setIsNotificationUpdate(false);
      }, 10_000);
    } else setIsNotificationUpdate(false);

    setPreviousTotalCount(currentTotalCount);
  }, [data]);

  return (
    <div ref={notificationRef}>
      <button
        type="button"
        className="relative block"
        aria-label="알림"
        onClick={toggleNotificationPopup}
      >
        <NotificationIcon className="fill-custom-black dark:fill-white" />

        {data && data?.totalCount > 0 && (
          <span className="absolute right-2 top-0 flex h-8 w-8">
            <span className="relative inline-flex h-8 w-8 rounded-full bg-custom-green-300 ring-1 ring-white" />
            {isNotificationUpdate && (
              <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-custom-green-300 opacity-75" />
            )}
          </span>
        )}
      </button>
      {isNotificationPopupOpen && <NotificationPopup closePopup={closePopup} />}
    </div>
  );
}
