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
  existingImages?: { id: number; imageUrl: string }[];
  onImageRemove?: (imageId: number) => void;
  onSuccess?: (uploadedUrl: string) => void;
}

export default function ImageUploader({
  name,
  maxImages = 1,
  label = '이미지 등록',
  existingImages = [],
  onImageRemove,
  onSuccess,
}: ImageUploadProps) {
  const { setValue } = useFormContext();
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(
    existingImages.map((img) => img.imageUrl),
  );

  const imageUploadMutation = useMutation({
    mutationFn: postActivityImage,
    onSuccess: (data) => {
      const newUrl = data.activityImageUrl;
      setImagePreviewUrls((prevUrls) => {
        const updatedUrls = [...prevUrls, newUrl].slice(0, maxImages);
        return Array.from(new Set(updatedUrls));
      });
      if (onSuccess) {
        onSuccess(newUrl);
      }
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });

  useEffect(() => {
    if (maxImages === 1) {
      setValue(name, imagePreviewUrls[0] || '');
    } else {
      setValue(name, imagePreviewUrls);
    }
  }, [imagePreviewUrls, name, setValue, maxImages]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const remainingSlots = maxImages - imagePreviewUrls.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      try {
        await Promise.all(
          filesToUpload.map((file) => imageUploadMutation.mutateAsync(file)),
        );
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
      }
    }
  };

  const handleDelete = (index: number) => {
    const imageToDelete = existingImages[index];
    if (imageToDelete && onImageRemove) {
      onImageRemove(imageToDelete.id);
    }

    const updatedUrls = imagePreviewUrls.filter((_, i) => i !== index);
    setImagePreviewUrls(updatedUrls);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap space-x-4">
        <label
          htmlFor={`image-upload-${label}`}
          className={classNames(
            'flex-center group mb-5 h-206 w-206 flex-shrink-0 flex-col rounded-md border-2 border-dashed border-gray-300 focus:outline-none',
            {
              'opacity-50': imagePreviewUrls.length >= maxImages,
              'hover:border-nomad-black dark:hover:border-custom-gray-800':
                imagePreviewUrls.length < maxImages,
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
                className="h-48 w-48 text-gray-400 group-hover:text-nomad-black dark:group-hover:text-custom-gray-800"
              />
              <span className="mt-1 text-gray-400 group-hover:text-nomad-black dark:group-hover:text-custom-gray-800">
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
          <div key={index} className="relative size-[206px] p-4">
            <Image
              src={url}
              alt="미리보기 이미지"
              fill
              sizes="206px"
              className="mr-14 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="absolute right-3 top-3 flex h-25 w-25 items-center justify-center place-self-center rounded-full bg-green-100 hover:bg-green-200 hover:shadow-md focus:outline-none"
            >
              <XIcon
                aria-label="삭제 아이콘"
                className="size-24 fill-current text-green-950"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
