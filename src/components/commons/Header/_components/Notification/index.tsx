import useClickOutside from '@/hooks/useClickOutside';
import { useMediaQuery } from '@/hooks/useMediaQeury';
import { getMyNotifications } from '@/libs/api/myNotifications';
import { NotificationIcon } from '@/libs/utils/Icon';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import NotificationPopup from './NotificationPopup';

export default function Notification() {
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const toggleNotificationPopup = () => {
    setIsNotificationPopupOpen((prev) => !prev);
  };

  const closePopup = () => {
    setIsNotificationPopupOpen(false);
  };

  const prefetchNotifications = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['notifications'],
      queryFn: () => getMyNotifications(),
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
      {isNotificationPopupOpen && (
        <>
          {!isMobile ? (
            <NotificationPopup closePopup={closePopup} />
          ) : (
            <NotificationPopup.Mobile closePopup={closePopup} />
          )}
        </>
      )}
    </div>
  );
}
