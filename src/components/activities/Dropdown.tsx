import { Dispatch, SetStateAction } from 'react';

import Dropdown from '../commons/Dropdown';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function DropdownContainer({ value, setValue }: Props) {
  return (
    <Dropdown selected={value} setSelected={setValue} width={150} height={41}>
      <Dropdown.Button />
      <Dropdown.Body>
        <Dropdown.Item value="최신순">
          <span className="text-14 text-custom-gray-800">최신순</span>
        </Dropdown.Item>
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
