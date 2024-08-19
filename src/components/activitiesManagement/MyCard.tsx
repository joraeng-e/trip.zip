import useClickOutside from '@/hooks/useClickOutside';
import { deleteMyActivity } from '@/libs/api/myActivities';
import { KebabIcon, StarOnIcon } from '@/libs/utils/Icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import Modal from '../commons/Modal';
import { notify } from '../commons/Toast';

interface MyCardProps {
  id: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
}

interface ErrorResponse {
  message: string;
}

export default function MyCard({
  id,
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  price,
}: MyCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      setIsDropdownOpen(false);

      notify('success', '체험이 성공적으로 삭제되었습니다.');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message || '체험 삭제에 실패했습니다.';
      notify('error', errorMessage);
    },
  });

  // useClickOutside(dropdownRef, () => {
  //   if (isDropdownOpen) {
  //     setIsDropdownOpen(false);
  //   }
  // });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    router.push(`myActivities/editForm/${id}`);
  };

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="mb-16 flex h-[153px] max-w-[800px] overflow-hidden rounded-lg shadow-md lg:h-[204px]">
      <div className="relative size-[153px] h-full flex-shrink-0 lg:size-[204px]">
        <Image
          src={bannerImageUrl}
          alt={title}
          layout="fill"
          sizes="153px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-16 transition-all hover:bg-gray-100 dark:hover:bg-custom-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-4 flex items-center">
              <StarOnIcon className="mr-4 h-16 w-16 text-yellow-400" />
              <span className="text-sm">
                {rating} ({reviewCount})
              </span>
            </div>
            <h3 className="text-2lg-bold lg:text-xl-bold">{title}</h3>
          </div>
          <div className="relative">
            <button onClick={toggleDropdown}>
              <KebabIcon className="md:h-40 md:w-40" />
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="dark-base absolute right-0 top-full z-50 mt-2 w-110 cursor-pointer rounded-md border-2 border-custom-gray-200 bg-white p-2 shadow-md md:w-140"
              >
                <div className="absolute -top-2 right-20 rotate-90">
                  <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-b-[11px] border-l-[11px] border-b-custom-gray-200 border-l-transparent" />
                  <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-l-[11px] border-t-[11px] border-l-transparent border-t-custom-gray-200" />
                </div>
                <Modal.Root>
                  <Modal.Trigger>
                    <p className="relative rounded-md px-4 py-2 text-center text-lg-medium transition-all hover:bg-custom-gray-300 dark:hover:bg-custom-gray-800">
                      수정하기
                    </p>
                  </Modal.Trigger>
                  <Modal.Content>
                    <Modal.Description className="text-center">
                      체험을 수정하시겠습니까?
                    </Modal.Description>
                    <Modal.Close onConfirm={handleEdit} confirm>
                      예
                    </Modal.Close>
                  </Modal.Content>
                </Modal.Root>
                <hr className="my-2 border border-gray-200" />
                <Modal.Root>
                  <Modal.Trigger>
                    <p className="z-50 rounded-md px-4 py-2 text-center text-lg-medium transition-all hover:bg-custom-gray-300 dark:hover:bg-custom-gray-800">
                      삭제하기
                    </p>
                  </Modal.Trigger>
                  <Modal.Content>
                    <Modal.Description className="text-center">
                      체험을 삭제하시겠습니까?
                    </Modal.Description>
                    <Modal.Close onConfirm={handleDelete} confirm>
                      예
                    </Modal.Close>
                  </Modal.Content>
                </Modal.Root>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-xl-medium font-bold text-gray-900 dark:text-white">
            ₩{price.toLocaleString()}
          </p>
          <span className="ml-4 text-lg-medium text-custom-gray-800">/인</span>
        </div>
      </div>
    </div>
  );
}
