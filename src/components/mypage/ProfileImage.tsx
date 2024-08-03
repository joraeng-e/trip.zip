import useClickOutside from '@/hooks/useClickOutside';
import { postProfileImage } from '@/libs/api/user';
import { BaseProfile, Pencil } from '@/libs/utils/Icon';
import { useMutation } from '@tanstack/react-query';
import { PostProfileImageResponse } from '@trip.zip-api';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const whileHover = {
  backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
};

export default function ProfileImage({
  profileImageUrl,
}: PostProfileImageResponse) {
  const [isEditBoxVisible, setIsEditBoxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation<PostProfileImageResponse, Error, FormData>({
    mutationFn: (formData: FormData) => postProfileImage(formData),
    onSuccess: (data) => {
      console.log('이미지 업로드 성공', data);
      setIsEditBoxVisible(false);
      setPreviewImageUrl(null);
    },
    onError: (error: Error) => {
      console.error('이미지 업로드 실패', error);
    },
  });

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (selectedImage) {
        alert('이미지 업로드는 최대 한 개만 가능합니다.');
        return;
      }
      setSelectedImage(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditClick = () => {
    console.log('Edit button clicked');
    setIsEditBoxVisible(!isEditBoxVisible);
    setPreviewImageUrl(null);
  };

  const handleChangeToDefaultImage = () => {
    console.log('기본 이미지로 변경');
    setSelectedImage(null); // 선택된 이미지 초기화
    setPreviewImageUrl(null); // 미리보기 이미지 초기화
    setIsEditBoxVisible(false); // 편집 박스 숨기기
  };

  // 선택한 이미지의 미리보기 URL 생성 + 해제
  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setPreviewImageUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreviewImageUrl(null);
    }
  }, [selectedImage]);

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
          />
        ) : (
          <BaseProfile className="h-full w-full object-cover" />
        )}
      </div>
      <motion.div
        className="flex-center absolute left-120 top-150 h-44 w-44 cursor-pointer rounded-full bg-custom-green-200 md:right-0"
        whileHover={whileHover}
        onClick={handleEditClick}
      >
        <Pencil />
      </motion.div>
      {isEditBoxVisible && (
        <div className="absolute -bottom-100 left-50 z-10 cursor-pointer rounded-md border-2 border-custom-gray-200 bg-white p-4 shadow-md md:bottom-135 md:left-0 md:right-0">
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
              className="relative cursor-pointer rounded-md px-4 py-4 text-center text-sm-medium transition-all hover:bg-custom-gray-300"
              onClick={handleImageClick}
            >
              이미지 업로드
            </p>
          </div>
          <hr className="my-2 border border-gray-200" />
          <p
            className="z-50 rounded-md px-4 py-4 text-center text-sm-medium transition-all hover:bg-custom-gray-300"
            onClick={handleChangeToDefaultImage}
          >
            기본 이미지로 변경
          </p>
        </div>
      )}
    </div>
  );
}