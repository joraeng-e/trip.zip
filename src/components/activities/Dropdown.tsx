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
      width={150}
      height={deviceState === Device.Mobile ? 41 : 59}
    >
      <Dropdown.Button>children</Dropdown.Button>
      <Dropdown.Body>
        <Dropdown.Item value="가격이 낮은 순">
          <span className="text-14 text-custom-gray-800">가격이 낮은 순</span>
        </Dropdown.Item>
        <Dropdown.Item value="가격이 높은 순">
          <span className="text-14 text-custom-gray-800">가격이 높은 순</span>
        </Dropdown.Item>
      </Dropdown.Body>
    </Dropdown>
  );
}
