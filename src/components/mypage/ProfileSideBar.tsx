import { useTabContext } from '@/context/TabContext';
import {
  BaseProfile,
  Logout,
  ProfileAccountIcon,
  ProfileCalendarIcon,
  ProfileChecklistIcon,
  ProfileCogIcon,
} from '@/libs/utils/Icon';
import { deleteCookie } from '@/libs/utils/cookie';
import { motion } from 'framer-motion';
import router from 'next/router';
import React from 'react';

const baseTextStyle =
  'group flex cursor-pointer items-center gap-12 rounded-xl px-20 py-8 text-lg-bold transition-all';
const textGroupStyle =
  'text-gray-400 hover:bg-custom-green-100 hover:text-nomad-black ';
const activeStyle = 'bg-custom-green-100 text-nomad-black';

const svgStyle = 'fill-gray-400 transition-all group-hover:fill-nomad-black';
const svgActiveStyle = 'fill-nomad-black';

type ProfileSideBarProps = {
  toggleOpen: () => void;
};

export default function ProfileSideBar({ toggleOpen }: ProfileSideBarProps) {
  const { activeTab, setActiveTab } = useTabContext();

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('isLogin');
    router.push('/');
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    toggleOpen();
  };

  return (
    <motion.div
      className="flex-center h-fit w-344 flex-col gap-20 rounded-xl border-2 bg-white py-20 shadow-lg md:w-384"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <div className="relative h-160 w-160 overflow-hidden rounded-full border-2">
          <BaseProfile className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-12 px-12">
        <div
          className={`${baseTextStyle} ${activeTab === 'info' ? activeStyle : textGroupStyle}`}
          onClick={() => handleTabClick('info')}
        >
          <ProfileAccountIcon
            className={`${activeTab === 'info' ? svgActiveStyle : svgStyle}`}
          />
          <p>내 정보</p>
        </div>
        <div
          className={`${baseTextStyle} ${activeTab === 'reservationList' ? activeStyle : textGroupStyle}`}
          onClick={() => handleTabClick('reservationList')}
        >
          <ProfileChecklistIcon
            className={`${activeTab === 'reservationList' ? svgActiveStyle : svgStyle}`}
          />
          <p>예약 내역</p>
        </div>
        <div
          className={`${baseTextStyle} ${activeTab === 'myActivities' ? activeStyle : textGroupStyle}`}
          onClick={() => handleTabClick('myActivities')}
        >
          <ProfileCogIcon
            className={`${activeTab === 'myActivities' ? svgActiveStyle : svgStyle}`}
          />
          <p>내 체험 관리</p>
        </div>
        <div
          className={`${baseTextStyle} ${activeTab === 'reservationState' ? activeStyle : textGroupStyle}`}
          onClick={() => handleTabClick('reservationState')}
        >
          <ProfileCalendarIcon
            className={`${activeTab === 'reservationState' ? svgActiveStyle : svgStyle}`}
          />
          <p>예약 현황</p>
        </div>
        <div
          className={`text-black ${baseTextStyle} border-t-2 hover:bg-custom-green-100`}
          onClick={logout}
        >
          <Logout className="h-20 w-20" />
          <p>로그아웃</p>
        </div>
      </div>
    </motion.div>
  );
}
