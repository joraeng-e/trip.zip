import Dropdown from '@/components/commons/Dropdown';
import { KebabIcon } from '@/libs/utils/Icon';

interface DropdownMenuProps {
  selected: string;
  setSelected: (value: string) => void;
}

export default function DropdownMenu({
  selected,
  setSelected,
}: DropdownMenuProps) {
  return (
    <Dropdown
      selected={selected}
      setSelected={setSelected}
      width={130}
      maxWidth={130}
    >
      <Dropdown.Button
        showArrow={false}
        className="relative flex w-130 items-center border-none md:h-59"
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
  );
}
