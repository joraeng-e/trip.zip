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

const textGroupStyle =
  'group flex cursor-pointer items-center gap-12 rounded-xl px-20 py-8 text-lg-bold text-gray-400 transition-all hover:bg-custom-green-100 hover:text-nomad-black';
const svgStyle = 'fill-gray-400 transition-all group-hover:fill-nomad-black';

const whileHover = {
  backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
};

export default function ProfileSideBar() {
  return (
    <div className="flex-center h-432 w-344 flex-col gap-8 rounded-xl border-2 shadow-lg md:h-432 md:w-384">
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
        <div className={textGroupStyle}>
          <ProfileAccountIcon className={svgStyle} />
          <p>내 정보</p>
        </div>
        <div className={textGroupStyle}>
          <ProfileChecklistIcon className={svgStyle} />
          <p>예약 내역</p>
        </div>
        <div className={textGroupStyle}>
          <ProfileCogIcon className={svgStyle} />
          <p>내 체험 관리</p>
        </div>
        <div className={textGroupStyle}>
          <ProfileCalendarIcon className={svgStyle} />
          <p>예약 현황</p>
        </div>
      </div>
    </div>
  );
}
