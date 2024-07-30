import { useTabContext } from '@/context/TabContext';
import {
  BaseProfile,
  Pencil,
  ProfileAccountIcon,
  ProfileCalendarIcon,
  ProfileChecklistIcon,
  ProfileCogIcon,
} from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import React from 'react';

const baseTextStyle =
  'group flex cursor-pointer items-center gap-12 rounded-xl px-20 py-8 text-lg-bold transition-all';
const textGroupStyle =
  'text-gray-400 hover:bg-custom-green-100 hover:text-nomad-black ';
const activeStyle = 'bg-custom-green-100 text-nomad-black';

const svgStyle = 'fill-gray-400 transition-all group-hover:fill-nomad-black';
const svgActiveStyle = 'fill-nomad-black';

const whileHover = {
  backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
};

export default function ProfileSideBar() {
  const { activeTab, setActiveTab } = useTabContext();

  return (
    <div className="flex-center h-432 w-344 flex-col gap-8 rounded-xl border-2 bg-white shadow-lg md:h-432 md:w-384">
      <div className="relative">
        <BaseProfile className="h-160 w-160" />
        <motion.div
          className="flex-center absolute bottom-0 right-10 h-44 w-44 cursor-pointer rounded-full bg-custom-green-200"
          whileHover={whileHover}
        >
          <Pencil />
        </motion.div>
      </div>
      <div className="flex w-full flex-col gap-12 px-12">
        <div
          className={`${baseTextStyle} ${activeTab === 'info' ? activeStyle : textGroupStyle}`}
          onClick={() => setActiveTab('info')}
        >
          <ProfileAccountIcon
            className={`${activeTab === 'info' ? svgActiveStyle : svgStyle}`}
          />
          <p>내 정보</p>
        </div>
        <div
          className={`${baseTextStyle} ${activeTab === 'reservationList' ? activeStyle : textGroupStyle}`}
          onClick={() => setActiveTab('reservationList')}
        >
          <ProfileChecklistIcon
            className={`${activeTab === 'reservationList' ? svgActiveStyle : svgStyle}`}
          />
          <p>예약 내역</p>
        </div>
        <div
          className={`${baseTextStyle} ${activeTab === 'myActivities' ? activeStyle : textGroupStyle}`}
          onClick={() => setActiveTab('myActivities')}
        >
          <ProfileCogIcon
            className={`${activeTab === 'myActivities' ? svgActiveStyle : svgStyle}`}
          />
          <p>내 체험 관리</p>
        </div>
        <div
          className={`${baseTextStyle} ${activeTab === 'reservationState' ? activeStyle : textGroupStyle}`}
          onClick={() => setActiveTab('reservationState')}
        >
          <ProfileCalendarIcon
            className={`${activeTab === 'reservationState' ? svgActiveStyle : svgStyle}`}
          />
          <p>예약 현황</p>
        </div>
      </div>
    </div>
  );
}
