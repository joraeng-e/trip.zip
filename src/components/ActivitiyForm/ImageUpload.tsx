import { PlusIcon, XIcon } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

interface ImageFile {
  file: File | null;
  previewUrl: string;
  id?: number;
}

interface ImageUploaderProps {
  name: string;
  maxImages?: number;
  label?: string;
  existingImages?: { id: number; imageUrl: string }[];
  onImageChange: (files: File[]) => void;
  onImageRemove?: (imageId: number) => void;
}

export default function ImageUploader({
  name,
  maxImages = 1,
  label = '이미지 등록',
  existingImages = [],
  onImageChange,
  onImageRemove,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>(
    existingImages.map((img) => ({
      file: null,
      previewUrl: img.imageUrl,
      id: img.id,
    })),
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const remainingSlots = maxImages - images.length;
      const newFiles = Array.from(files).slice(0, remainingSlots);

      const newImages = newFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);

      onImageChange(newFiles);
    }
  };

  const handleDelete = (index: number) => {
    const imageToDelete = images[index];
    if (imageToDelete.id && onImageRemove) {
      onImageRemove(imageToDelete.id);
    } else if (imageToDelete.file) {
      URL.revokeObjectURL(imageToDelete.previewUrl);
      onImageChange(
        images.filter((_, i) => i !== index).map((img) => img.file!),
      );
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap space-x-4">
        <label
          htmlFor={`image-upload-${name}`}
          className={classNames(
            'flex-center group mb-5 h-140 w-140 flex-shrink-0 flex-col rounded-md border-2 border-dashed border-gray-300 focus:outline-none md:h-206 md:w-206',
            {
              'opacity-50': images.length >= maxImages,
              'hover:border-nomad-black dark:hover:border-custom-gray-800':
                images.length < maxImages,
            },
          )}
          style={{
            cursor: images.length >= maxImages ? 'not-allowed' : 'pointer',
          }}
          aria-label={label}
        >
          <PlusIcon
            aria-label="등록 아이콘"
            className="h-48 w-48 text-gray-400 group-hover:text-nomad-black dark:group-hover:text-custom-gray-800"
          />
          <span className="mt-1 text-gray-400 group-hover:text-nomad-black dark:group-hover:text-custom-gray-800">
            {label}
          </span>
        </label>

        <input
          id={`image-upload-${name}`}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          multiple={maxImages > 1}
          disabled={images.length >= maxImages}
        />

        {images.map((image, index) => (
          <div
            key={index}
            className="relative size-[140px] p-4 md:size-[206px]"
          >
            <Image
              src={image.previewUrl}
              alt="미리보기 이미지"
              fill
              sizes="206px"
              className="mr-14 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="absolute right-3 top-3 flex h-24 w-24 items-center justify-center place-self-center rounded-full bg-green-100 hover:bg-green-200 hover:shadow-md focus:outline-none"
            >
              <XIcon
                aria-label="삭제 아이콘"
                className="size-20 fill-current text-green-950"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
