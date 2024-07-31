import { motion } from 'framer-motion';
import Image from 'next/image';

import { useDropdownContext } from '.';

const ArrowDown = '/icon/arrowDown.svg';

export default function Button({ ...rest }) {
  const { toggleDropdown, isOpen, selected, width, height } =
    useDropdownContext();

  return (
    <button
      {...rest}
      style={{
        width: width,
        height: height,
      }}
      className={`flex-center min-h-41 min-w-90 justify-between rounded-xl border-1 border-custom-green-200 pl-20 pr-12 outline-none`}
      onClick={toggleDropdown}
    >
      <span>{selected}</span>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Image src={ArrowDown} alt="드롭다운 펼치기" width={22} height={22} />
      </motion.div>
    </button>
  );
}
