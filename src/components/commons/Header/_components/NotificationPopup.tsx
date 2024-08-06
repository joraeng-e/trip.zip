import { XIcon } from '@/libs/utils/Icon';
import { forwardRef } from 'react';

import Notification from './Notification';

const MOCK_DATA = {
  totalCount: 1,
  notifications: [
    {
      id: 1901,
      teamId: '6-8',
      userId: 808,
      content:
        '요리와 와인의 조화(2024-08-19 19:00~21:00) 예약이 승인되었습니다.',
      createdAt: '2024-08-06T07:56:17.980Z',
      updatedAt: '2024-08-06T07:56:17.980Z',
      deletedAt: null,
    },
  ],
  cursorId: null,
};

interface Props {
  closePopup: () => void;
}

const NotificationPopup = forwardRef<HTMLDivElement, Props>(
  ({ closePopup }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute right-100 top-full z-50 mt-20 min-h-160 w-[368px] rounded-[10px] bg-custom-green-100 px-20 py-24 shadow-lg xl:right-0"
      >
        <div className="mb-16 flex items-center justify-between">
          <h1 className="text-20 font-bold leading-32">알림 6개</h1>
          <button type="button" onClick={closePopup}>
            <XIcon />
          </button>
        </div>

        <div className="no-scrollbar flex max-h-300 flex-col gap-8 overflow-y-auto">
          {MOCK_DATA.notifications.map((data) => (
            <Notification key={data.id} data={data} />
          ))}
        </div>
      </div>
    );
  },
);

NotificationPopup.displayName = 'NotificationPopup';

export default NotificationPopup;

export function NotificationMobilePopup({ closePopup }: Props) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-custom-green-100 px-20 py-40">
      <div className="mb-16 flex justify-between">
        <h1 className="text-20 font-bold leading-32">알림 6개</h1>
        <button type="button" onClick={closePopup}>
          <XIcon />
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {MOCK_DATA.notifications.map((data) => (
          <Notification key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}
