import { ReactNode } from 'react';

import { useDropdownContext } from '.';

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function Button({ children, className, ...rest }: ButtonProps) {
  const { toggleDropdown } = useDropdownContext();

  return (
    <button
      {...rest}
      className={`${className} outline-none`}
      onClick={toggleDropdown}
      type="button"
    >
      {children}
    </button>

    // <button
    //   {...rest}
    //   style={{
    //     maxWidth: width,
    //     height: height,
    //   }}
    //   className={`flex-center min-h-41 w-full min-w-90 justify-between rounded-xl border-1 border-custom-green-200 pl-18 pr-10 outline-none`}
    //   onClick={toggleDropdown}
    //   type="button"
    // >
    //   <span className="text-14 font-light md:text-18">{buttonText}</span>
    //   <motion.div
    //     initial={{ rotate: 0 }}
    //     animate={{ rotate: isOpen ? 180 : 0 }}
    //     transition={{ duration: 0.3 }}
    //   >
    //     <Image src={ArrowDown} alt="드롭다운 펼치기" width={22} height={22} />
    //   </motion.div>
    // </button>
  );
}
