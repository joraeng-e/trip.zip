import { PlusIcon, XIcon } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

interface ImageUploadProps {
  maxImages?: number;
}

export default function ImageUploader({
  maxImages = 1,
  label = '이미지 등록',
}: ImageUploadProps & { label?: string }) {
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

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
    <div className="flex space-y-4 p-4">
      <label
        htmlFor={`image-upload-${label}`}
        className={classNames(
          'flex-center h-206 w-206 cursor-pointer flex-col rounded-lg border-2 border-dashed border-gray-300 focus:outline-none',
          {
            'cursor-not-allowed opacity-50':
              imagePreviewUrls.length >= maxImages,
            'hover:border-nomad-black': imagePreviewUrls.length < maxImages,
          },
        )}
      >
        <PlusIcon
          aria-label="등록 아이콘"
          className="h-48 w-48 text-gray-500"
        />
        <span className="mt-1 text-gray-600">{label}</span>
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

      <div className="flex space-x-4">
        {imagePreviewUrls.map((url, index) => (
          <div key={index} className="relative">
            <Image
              src={url}
              alt="미리보기 이미지"
              width={206}
              height={206}
              className="ml-14 rounded-lg object-cover"
            />
            <button
              onClick={() => handleDelete(index)}
              className="flex-center absolute -right-15 -top-8 h-25 w-25 rounded-full hover:bg-green-100 focus:outline-none"
            >
              <XIcon
                aria-label="삭제 아이콘"
                className="mt-7 h-32 w-32 fill-current text-green-950"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
