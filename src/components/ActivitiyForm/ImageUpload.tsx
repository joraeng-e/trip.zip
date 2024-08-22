import { PlusIcon, XIcon } from '@/libs/utils/Icon';
import classNames from '@/libs/utils/classNames';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ImageUploadProps {
  name: string;
  maxImages?: number;
  label?: string;
  existingImages?: { id: number; imageUrl: string }[];
  onImageRemove?: (imageId: number) => void;
  onFilesSelected: (files: File[]) => void;
}

interface ImagePreview {
  file: File | null;
  url: string;
  id?: number;
}

export default function ImageUploader({
  name,
  maxImages = 1,
  label = '이미지 등록',
  existingImages = [],
  onImageRemove,
  onFilesSelected,
}: ImageUploadProps) {
  const { setValue } = useFormContext();
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>(
    existingImages.map((img) => ({
      file: null,
      url: img.imageUrl,
      id: img.id,
    })),
  );

  useEffect(() => {
    if (maxImages === 1) {
      setValue(name, imagePreviews[0]?.url || '');
    } else {
      setValue(
        name,
        imagePreviews.map((preview) => preview.url),
      );
    }
  }, [imagePreviews, name, setValue, maxImages]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const remainingSlots = maxImages - imagePreviews.length;
      const filesToAdd = Array.from(files).slice(0, remainingSlots);

      const newPreviews = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      onFilesSelected(filesToAdd);
    }
  };

  const handleDelete = (index: number) => {
    const previewToDelete = imagePreviews[index];

    if (previewToDelete.id && onImageRemove) {
      onImageRemove(previewToDelete.id);
    }

    setImagePreviews((prevPreviews) => {
      const updatedPreviews = prevPreviews.filter((_, i) => i !== index);
      onFilesSelected(
        updatedPreviews
          .map((preview) => preview.file)
          .filter((file): file is File => file !== null),
      );
      return updatedPreviews;
    });

    URL.revokeObjectURL(previewToDelete.url);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap space-x-4">
        <label
          htmlFor={`image-upload-${label}`}
          className={classNames(
            'flex-center group mb-5 h-206 w-206 flex-shrink-0 flex-col rounded-md border-2 border-dashed border-gray-300 focus:outline-none',
            {
              'opacity-50': imagePreviews.length >= maxImages,
              'hover:border-nomad-black dark:hover:border-custom-gray-800':
                imagePreviews.length < maxImages,
            },
          )}
          style={{
            cursor:
              imagePreviews.length >= maxImages ? 'not-allowed' : 'pointer',
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
          id={`image-upload-${label}`}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          multiple={maxImages > 1}
          disabled={imagePreviews.length >= maxImages}
        />

        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative size-[206px] p-4">
            <Image
              src={preview.url}
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
