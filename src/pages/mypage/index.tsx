import Info from '@/components/mypage/Info';
import MyActivities from '@/components/mypage/MyActivities';
import ProfileSideBar from '@/components/mypage/ProfileSideBar';
import ReservationList from '@/components/mypage/ReservationList';
import ReservationState from '@/components/mypage/ReservationState';
import { TabProvider, useTabContext } from '@/context/TabContext';
import React from 'react';

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
