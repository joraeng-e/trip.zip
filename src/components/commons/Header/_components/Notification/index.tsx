import useClickOutside from '@/hooks/useClickOutside';
import { getMyNotifications } from '@/libs/api/myNotifications';
import { NotificationIcon } from '@/libs/utils/Icon';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import NotificationPopup from './NotificationPopup';

export default function Notification() {
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const toggleNotificationPopup = () => {
    setIsNotificationPopupOpen((prev) => !prev);
  };

  const closePopup = () => {
    setIsNotificationPopupOpen(false);
  };

  const prefetchNotifications = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['notifications'],
      queryFn: ({ pageParam: cursorId }) =>
        getMyNotifications({ size: 3, cursorId }),
      initialPageParam: undefined,
      staleTime: 0,
    });
  };

  const handleMouseEnter = () => {
    prefetchNotifications();
  };

  useClickOutside(notificationRef, closePopup);

  return (
    <div ref={notificationRef}>
      <button
        type="button"
        className="relative block"
        aria-label="알림"
        onClick={toggleNotificationPopup}
        onMouseEnter={handleMouseEnter}
      >
        <NotificationIcon />

        <span className="absolute right-2 top-0 flex h-6 w-6">
          <span className="relative inline-flex h-6 w-6 rounded-full bg-custom-green-300 ring-1 ring-white" />
          <span className="animate-ping absolute inline-flex size-full rounded-full bg-custom-green-300 opacity-75" />
        </span>
      </button>
      {isNotificationPopupOpen && <NotificationPopup closePopup={closePopup} />}
    </div>
  );
}
