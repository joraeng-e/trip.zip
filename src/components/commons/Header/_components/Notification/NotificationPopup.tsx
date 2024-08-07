import { getMyNotifications } from '@/libs/api/myNotifications';
import { PaperPlaneIcon, XIcon } from '@/libs/utils/Icon';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';

import NotificationItem from './NotificationItem';

interface Props {
  closePopup: () => void;
}

export default function NotificationPopup({ closePopup }: Props) {
  const { data, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getMyNotifications(),
  });

  const [notifications, setNotifications] = useState(data?.notifications || []);
  const [totalCount, setTotalCount] = useState(data?.totalCount || 0);

  const handleDelete = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
    setTotalCount((prev) => prev - 1);
  };

  return (
    <>
      <div className="hidden md:block">
        <TabletAndPCUI
          data={notifications}
          totalCount={totalCount}
          closePopup={closePopup}
          handleDelete={handleDelete}
          isError={isError}
        />
      </div>

      <div className="block md:hidden">
        <MobileUI
          data={notifications}
          totalCount={totalCount}
          closePopup={closePopup}
          handleDelete={handleDelete}
          isError={isError}
        />
      </div>
    </>
  );
}

interface UIProps {
  data: {
    id: number;
    teamId: string;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
  totalCount: number;
  closePopup: () => void;
  handleDelete: (id: number) => void;
  isError: boolean;
}

function TabletAndPCUI({
  data,
  totalCount,
  closePopup,
  handleDelete,
  isError,
}: UIProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute right-100 top-full z-50 mt-20 min-h-160 w-[368px] rounded-[10px] bg-custom-green-100 px-20 py-24 shadow-lg xl:right-0"
    >
      <div className="mb-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PaperPlaneIcon width={32} height={32} />
          <h1 className="text-20 font-bold leading-32">알림 {totalCount}개</h1>
        </div>
        <button type="button" onClick={closePopup}>
          <XIcon />
        </button>
      </div>

      <div className="no-scrollbar flex max-h-300 flex-col gap-8 overflow-y-auto">
        {data.length === 0 && (
          <h1 className="flex-center mt-16 text-custom-gray-800">
            알림이 없습니다.
          </h1>
        )}
        {data.map((notification) => (
          <NotificationItem
            key={notification.id}
            data={notification}
            onDelete={handleDelete}
          />
        ))}
        {isError && <h1 className="flex-center mt-16">에러가 발생했습니다.</h1>}
      </div>
    </motion.div>
  );
}

function MobileUI({
  data,
  totalCount,
  closePopup,
  handleDelete,
  isError,
}: UIProps) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-custom-green-100 px-20 py-40">
      <div className="mb-16 flex justify-between">
        <div className="flex items-center gap-4">
          <PaperPlaneIcon width={32} height={32} />
          <h1 className="text-20 font-bold leading-32">알림 {totalCount}개</h1>
        </div>
        <button type="button" onClick={closePopup}>
          <XIcon />
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {data.length === 0 && (
          <h1 className="flex-center mt-20 text-custom-gray-800">
            알림이 없습니다.
          </h1>
        )}
        {data.map((each) => (
          <NotificationItem key={each.id} data={each} onDelete={handleDelete} />
        ))}
        {isError && <h1 className="flex-center mt-20">에러가 발생했습니다.</h1>}
      </div>
    </div>
  );
}
