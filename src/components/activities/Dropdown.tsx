import useDeviceState from '@/hooks/useDeviceState';
import Device from '@/libs/constants/device';
import { Dispatch, SetStateAction } from 'react';

import Dropdown from '../commons/Dropdown';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function DropdownContainer({ value, setValue }: Props) {
  const deviceState = useDeviceState();

  return (
    <Dropdown
      selected={value}
      setSelected={setValue}
      width={130}
      maxWidth={130}
      height={deviceState === Device.Mobile ? 41 : 59}
    >
      <Dropdown.Button className="flex h-43 w-130 items-center justify-between rounded-[15px] border border-custom-green-200 bg-white px-20 text-custom-green-200 md:h-59">
        가격
      </Dropdown.Button>
      <Dropdown.Body>
        <Dropdown.Item value="가격이 낮은 순">
          <span className="text-14 text-custom-gray-800 dark:text-white">
            가격이 낮은 순
          </span>
        </Dropdown.Item>
        <Dropdown.Item value="가격이 높은 순">
          <span className="text-14 text-custom-gray-800 dark:text-white">
            가격이 높은 순
          </span>
        </Dropdown.Item>
      </Dropdown.Body>
    </Dropdown>
  );
}
