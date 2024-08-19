import { BaseProfile, Pencil } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { notify } from '../commons/Toast';

const whileHover = {
  backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
};

type ProfileImageProps = {
  profileImageUrl: string | null;
  handleImageChange: (file: File | null) => void;
};

export default function ProfileImage({
  profileImageUrl,
  handleImageChange,
}: ProfileImageProps) {
  const [isEditBoxVisible, setIsEditBoxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    profileImageUrl,
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (selectedImage) {
        notify('warning', '이미지 업로드는 최대 한 개만 가능합니다.');
        return;
      }

      handleImageChange(file);
      setPreviewImageUrl(URL.createObjectURL(file));
      setSelectedImage(file);
      setIsEditBoxVisible(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 연필 클릭
  const handleEditClick = () => {
    setIsEditBoxVisible(!isEditBoxVisible);
  };

  // 기본 이미지로 변경
  const handleChangeToDefaultImage = () => {
    console.log('기본 이미지로 변경');
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
    }
    setSelectedImage(null);
    setPreviewImageUrl(null);
    setIsEditBoxVisible(false);
    handleImageChange(null);
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  useEffect(() => {
    if (profileImageUrl) {
      setPreviewImageUrl(profileImageUrl);
    } else {
      setPreviewImageUrl(null);
    }
  }, [profileImageUrl]);

  return (
    <div className="relative flex flex-col">
      <p className="mb-8 font-bold">프로필 사진</p>
      <div className="relative h-160 w-160 overflow-hidden rounded-full border-2">
        {previewImageUrl ? (
          <Image
            src={previewImageUrl}
            alt="미리보기"
            className="h-full w-full object-cover"
            width={160}
            height={160}
            priority
          />
        ) : (
          <BaseProfile className="h-full w-full object-cover" />
        )}
      </div>
      <motion.div
        className="flex-center dark-border absolute left-120 top-150 h-44 w-44 cursor-pointer rounded-full bg-custom-green-200 md:right-0"
        whileHover={whileHover}
        onClick={handleEditClick}
      >
        <Pencil />
      </motion.div>
      {isEditBoxVisible && (
        <motion.div
          className="absolute -bottom-100 left-50 cursor-pointer rounded-md border-2 border-custom-gray-200 bg-white p-4 shadow-md md:bottom-130 md:left-0 md:right-0 dark:bg-custom-black dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute -top-2 right-20 rotate-90">
            <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-b-[11px] border-l-[11px] border-b-custom-gray-200 border-l-transparent" />
            <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-l-[11px] border-t-[11px] border-l-transparent border-t-custom-gray-200" />
          </div>
          <div className="relative">
            <input
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImgChange}
            />
            <p
              className="relative cursor-pointer rounded-md px-4 py-4 text-center text-sm-medium transition-all hover:bg-custom-gray-300 dark:hover:bg-custom-gray-800"
              onClick={handleImageClick}
            >
              이미지 업로드
            </p>
          </div>
          <hr className="my-2 border border-gray-200" />
          <p
            className="z-50 rounded-md px-4 py-4 text-center text-sm-medium transition-all hover:bg-custom-gray-300 dark:hover:bg-custom-gray-800"
            onClick={handleChangeToDefaultImage}
          >
            기본 이미지로 변경
          </p>
        </motion.div>
      )}
    </div>
  );
}
