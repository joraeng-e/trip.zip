import Dropdown from '@/components/commons/Dropdown';
import { KebabIcon, LocationIcon } from '@/libs/utils/Icon';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface TitleProps {
  title: string;
  address: string;
  category: string;
  rating: number;
  reviewCount: number;
  id?: number;
  isSameUser: boolean;
}

export default function Title(props: TitleProps) {
  const { title, address, category, rating, reviewCount, isSameUser } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      router.push('/mypage/myActivities');
      setValue('');
    }
  }, [value]);

  const handleClickClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('주소가 클립보드에 복사되었습니다!');
    });
  };

  return (
    <div className="mx-16 mt-16 flex-col">
      <div className="text-md-regular text-nomad-black dark:text-white">
        {category}
      </div>
      <div className="relative mb-16 mt-10 flex items-center justify-between text-2xl-bold text-nomad-black dark:text-white">
        {title}
        {isSameUser && (
          <Dropdown
            selected={value}
            setSelected={setValue}
            width={130}
            maxWidth={130}
          >
            <Dropdown.Button
              showArrow={false}
              className="relative flex w-130 items-center md:h-59"
            >
              <KebabIcon className="absolute left-106" />
            </Dropdown.Button>
            <Dropdown.Body>
              <Dropdown.Item value="edit">
                <span className="text-14 text-custom-gray-800 dark:text-white">
                  체험 수정하기
                </span>
              </Dropdown.Item>
              <Dropdown.Item value="delete">
                <span className="text-14 text-custom-gray-800 dark:text-white">
                  체험 삭제하기
                </span>
              </Dropdown.Item>
            </Dropdown.Body>
          </Dropdown>
        )}
      </div>
      <div className="flex gap-12 text-md-regular text-custom-black dark:text-white">
        <FaStar className="mt-4 text-yellow-500" />
        {rating}({reviewCount})
        <div
          className="flex cursor-pointer items-center gap-12"
          onClick={handleClickClipboard}
        >
          <LocationIcon className="fill-nomad-black dark:fill-white" />
          <div>{address}</div>
        </div>
      </div>
    </div>
  );
}
