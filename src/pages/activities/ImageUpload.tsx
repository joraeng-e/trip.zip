import { PlusIcon, XIcon } from '@/libs/utils/Icon';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

interface ImageUploadProps {
  title?: string;
}

export default function ImageUpload({ title }: ImageUploadProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl('');
  };

  return (
    <div className="p-4">
      {title && (
        <label className="text-lg mb-2 block font-medium text-gray-700">
          {title}
        </label>
      )}

      <div className="flex items-center space-x-4">
        <label
          htmlFor="image-upload"
          className="flex-center h-206 w-206 cursor-pointer flex-col rounded-md border-2 border-dashed border-gray-300 hover:border-nomad-black focus:outline-none"
        >
          <PlusIcon
            aria-label="등록 아이콘"
            className="h-48 w-48 text-gray-500"
          />
          <span className="mt-1 text-gray-600">이미지 등록</span>
        </label>

        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {imagePreviewUrl && (
          <div className="relative">
            <Image
              src={imagePreviewUrl}
              alt="미리보기 이미지"
              width={206}
              height={206}
              className="ml-14 rounded-md object-cover"
            />
            <button
              onClick={handleDelete}
              className="flex-center absolute -right-15 -top-8 h-25 w-25 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <XIcon aria-label="삭제 아이콘" className="mt-7 h-32 w-32" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
