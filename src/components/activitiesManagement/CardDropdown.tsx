import useClickOutside from '@/hooks/useClickOutside';
import { KebabIcon } from '@/libs/utils/Icon';
import { useRef, useState } from 'react';

import Modal from '../commons/Modal';

interface CardDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardDropdown({ onEdit, onDelete }: CardDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useClickOutside(dropdownRef, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-gray-400 hover:text-gray-600"
        onClick={toggleDropdown}
      >
        <KebabIcon />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-160 cursor-pointer rounded-md border-2 border-custom-gray-200 bg-white p-4 shadow-md">
          <div className="absolute -top-2 right-20 rotate-90">
            <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-b-[11px] border-l-[11px] border-b-custom-gray-200 border-l-transparent" />
            <div className="pointer-events-none -translate-x-15 -translate-y-1/2 transform border-l-[11px] border-t-[11px] border-l-transparent border-t-custom-gray-200" />
          </div>
          <Modal.Root>
            <Modal.Trigger>
              <p className="relative rounded-md px-4 py-4 text-center text-lg-medium transition-all hover:bg-custom-gray-300">
                수정하기
              </p>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Description className="text-center">
                체험을 수정하시겠습니까?
              </Modal.Description>
              <Modal.Close onConfirm={onEdit} confirm>
                예
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
          <hr className="my-2 border border-gray-200" />
          <Modal.Root>
            <Modal.Trigger>
              <p className="z-50 rounded-md px-4 py-4 text-center text-lg-medium transition-all hover:bg-custom-gray-300">
                삭제하기
              </p>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Description className="text-center">
                체험을 삭제하시겠습니까?
              </Modal.Description>
              <Modal.Close onConfirm={onDelete} confirm>
                예
              </Modal.Close>
            </Modal.Content>
          </Modal.Root>
        </div>
      )}
    </div>
  );
}
