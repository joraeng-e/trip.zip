import useClickOutside from '@/hooks/useClickOutside';
import { BaseProfile, Pencil } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

const whileHover = {
  backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
};

export default function ProfileImage() {
  const [isEditBoxVisible, setIsEditBoxVisible] = useState(false);

  const handleEditClick = () => {
    setIsEditBoxVisible(!isEditBoxVisible);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsEditBoxVisible(false));

  return (
    <div className="relative flex flex-col">
      <p className="mb-4 font-bold">프로필 사진</p>
      <div className="relative h-160 w-160 overflow-hidden rounded-full border-2">
        <BaseProfile className="h-full w-full object-cover" />
      </div>
      <motion.div
        className="flex-center absolute bottom-0 left-120 h-44 w-44 cursor-pointer rounded-full bg-custom-green-200"
        whileHover={whileHover}
        onClick={handleEditClick}
        ref={dropdownRef}
      >
        <Pencil />
      </motion.div>
      {isEditBoxVisible && (
        <div className="border-2-custom-gray-200 absolute left-180 top-130 z-10 cursor-pointer rounded-md border-2 bg-white p-4 shadow-md">
          <div className="pointer-events-none absolute top-30 -translate-x-15 -translate-y-1/2 transform border-b-[11px] border-l-[11px] border-b-custom-gray-200 border-l-transparent" />
          <div className="pointer-events-none absolute top-40 -translate-x-15 -translate-y-1/2 transform border-l-[11px] border-t-[11px] border-l-transparent border-t-custom-gray-200" />

          <p className="rounded-md px-4 py-2 transition-all hover:bg-custom-gray-300">
            이미지 업로드
          </p>
          <hr className="my-2 border border-gray-200" />
          <p className="rounded-md px-4 py-2 transition-all hover:bg-custom-gray-300">
            기본 이미지로 변경
          </p>
        </div>
      )}
    </div>
  );
}
