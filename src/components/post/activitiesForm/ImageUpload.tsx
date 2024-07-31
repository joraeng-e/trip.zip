import { PlusIcon, XIcon } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';

interface ImageUploadProps {
  maxImages?: number;
  onChange: (imageUrls: string[]) => void;
  label?: string;
}

export default function ImageUploader({
  maxImages = 1,
  label = '이미지 등록',
  onChange,
}: ImageUploadProps) {
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    onChange(imagePreviewUrls);
  }, [imagePreviewUrls, onChange]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviewUrls((prevUrls) =>
        [...prevUrls, ...newImageUrls].slice(0, maxImages),
      );
    }
  };

  const handleDelete = (index: number) => {
    setImagePreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
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
        >
          <PlusIcon
            aria-label="등록 아이콘"
            className="h-48 w-48 text-gray-400 group-hover:text-nomad-black"
          />
          <span className="mt-1 text-gray-400 group-hover:text-nomad-black">
            {label}
          </span>
        </label>

        <input
          id={`image-upload-${label}`}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          multiple
          disabled={imagePreviewUrls.length >= maxImages}
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
    </div>
  );
}
