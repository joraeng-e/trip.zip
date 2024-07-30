import { TabProvider, useTabContext } from '@/context/TabContext';
import React from 'react';

import Info from './_components/Info';
import MyActivities from './_components/MyActivities';
import ProfileSideBar from './_components/ProfileSideBar';
import ReservationList from './_components/ReservationList';
import ReservationState from './_components/ReservationState';

function Mypage() {
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
        return <ReservationState />;
      default:
        return <Info />;
    }
  };

  return (
    <div className="page-container flex items-start justify-between gap-20">
      <ProfileSideBar />
      <div className="flex-1">{renderPage()}</div>
    </div>
  );
}

export default function MypageWithProvider() {
  return (
    <TabProvider>
      <Mypage />
    </TabProvider>
  );
}
