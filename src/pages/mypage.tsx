import Info from '@/components/mypage/Info';
import { MenuToggle } from '@/components/mypage/MenuToggle';
import MyActivities from '@/components/mypage/MyActivities';
import ProfileSideBar from '@/components/mypage/ProfileSideBar';
import ReservationList from '@/components/mypage/ReservationList';
import ReservationStatus from '@/components/mypage/ReservationStatus';
import { TabProvider, useTabContext } from '@/context/TabContext';
import { useMediaQuery } from '@/hooks/useMediaQeury';
import { motion, useCycle } from 'framer-motion';
import React from 'react';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

function MyPage() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const { activeTab } = useTabContext();

  const renderPage = () => {
    switch (activeTab) {
      case 'info':
        return <Info />;
      case 'reservationList':
        return <ReservationList />;
      case 'myActivities':
        return <MyActivities />;
      case 'reservationState':
        return <ReservationStatus />;
      default:
        return <Info />;
    }
  };

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div
      className={`page-container min-screen flex pt-50 md:gap-20 ${isMobile ? 'flex-col items-center' : 'flex-row items-start'}`}
    >
      <div className="hidden md:block">
        <ProfileSideBar toggleOpen={toggleOpen} />
      </div>
      {isMobile && (
        <div className="flex">
          <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
            <MenuToggle toggle={() => toggleOpen()} />
            <motion.div
              className="absolute bottom-0 left-0 top-70 -z-10 w-full bg-custom-green-100"
              variants={sidebar}
            ></motion.div>
            {isOpen && <ProfileSideBar toggleOpen={toggleOpen} />}
          </motion.nav>
        </div>
      )}
      {(isMobile && isOpen) || (
        <div className="w-full md:flex-1">{renderPage()}</div>
      )}
    </div>
  );
}

export default function MypageWithProvider() {
  return (
    <TabProvider>
      <MyPage />
    </TabProvider>
  );
}
