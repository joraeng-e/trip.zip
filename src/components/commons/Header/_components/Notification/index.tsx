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
    });
  };

  const handleMouseEnter = () => {
    prefetchNotifications();
  };

  useClickOutside(notificationRef, closePopup);

  return (
    <div ref={notificationRef}>
      <div
        className="cursor-pointer"
        aria-label="알림"
        onClick={toggleNotificationPopup}
        onMouseEnter={handleMouseEnter}
      >
        <NotificationIcon />
      </div>
      {isNotificationPopupOpen && <NotificationPopup closePopup={closePopup} />}
    </div>
  );
}
