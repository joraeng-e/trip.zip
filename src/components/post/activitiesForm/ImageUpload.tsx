import { postActivityImage } from '@/libs/api/activities';
import { PlusIcon, XIcon } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ImageUploadProps {
  name: string;
  maxImages?: number;
  label?: string;
}

export default function ImageUploader({
  name,
  maxImages = 1,
  label = '이미지 등록',
}: ImageUploadProps) {
  const { setValue } = useFormContext();
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const imageUploadMutation = useMutation({
    mutationFn: postActivityImage,
    onSuccess: (data) => {
      setImagePreviewUrls((prevUrls) => {
        const updatedUrls = [...prevUrls, data.activityImageUrl].slice(
          0,
          maxImages,
        );
        return Array.from(new Set(updatedUrls)); // Remove duplicate URLs
      });
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      // 에러 처리 로직 추가 (예: 에러 메시지 표시)
    },
  });

  useEffect(() => {
    if (maxImages === 1) {
      setValue(name, imagePreviewUrls[0] || ''); // 단일 이미지 URL 설정
    } else {
      setValue(name, imagePreviewUrls); // 다중 이미지 URL 배열 설정
    }
  }, [imagePreviewUrls, name, setValue, maxImages]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (imagePreviewUrls.length >= maxImages) break;
        await imageUploadMutation.mutateAsync(files[i]);
      }
    }
  };

  const handleDelete = (index: number) => {
    const updatedUrls = imagePreviewUrls.filter((_, i) => i !== index);
    setImagePreviewUrls(updatedUrls);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap space-x-4">
        <label
          htmlFor={`image-upload-${label}`}
          className={classNames(
            'flex-center group h-206 w-206 flex-shrink-0 flex-col rounded-md border-2 border-dashed border-gray-300 focus:outline-none',
            {
              'opacity-50': imagePreviewUrls.length >= maxImages,
              'hover:border-nomad-black': imagePreviewUrls.length < maxImages,
            },
          )}
          style={{
            cursor:
              imagePreviewUrls.length >= maxImages ? 'not-allowed' : 'pointer',
          }}
          aria-label={label}
        >
          {imageUploadMutation.isPending ? (
            <span>업로드 중...</span>
          ) : (
            <>
              <PlusIcon
                aria-label="등록 아이콘"
                className="h-48 w-48 text-gray-400 group-hover:text-nomad-black"
              />
              <span className="mt-1 text-gray-400 group-hover:text-nomad-black">
                {label}
              </span>
            </>
          )}
        </label>

        <input
          id={`image-upload-${label}`}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          multiple={maxImages > 1}
          disabled={
            imagePreviewUrls.length >= maxImages ||
            imageUploadMutation.isPending
          }
        />

        {imagePreviewUrls.map((url, index) => (
          <div key={index} className="relative p-4">
            <Image
              src={url}
              alt="미리보기 이미지"
              width={206}
              height={206}
              className="mr-14 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="absolute right-0 top-0 h-25 w-25 place-self-center rounded-full bg-green-100 hover:bg-green-200 hover:shadow-md focus:outline-none"
            >
              <XIcon
                aria-label="삭제 아이콘"
                className="h-32 w-32 fill-current text-green-950"
              />
            </button>
          </div>
        ))}
      </div>
      {imageUploadMutation.isError && (
        <p className="mt-2 text-red-500">
          이미지 업로드 중 오류가 발생했습니다.
        </p>
      )}
    </div>
  );
}
