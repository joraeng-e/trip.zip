import Image from 'next/image';

import { useDropdownContext } from '.';

const ArrowDown = '/icon/arrowDown.svg';

export default function Button({ ...rest }) {
  const { toggleDropdown, selected } = useDropdownContext();

  return (
    <button {...rest} className="flex" onClick={toggleDropdown}>
      <span>{selected}</span>
      <Image src={ArrowDown} alt="드롭다운 펼치기" width={22} height={22} />
    </button>
  );
}
