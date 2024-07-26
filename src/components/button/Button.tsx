import { PaperPlaneIcon } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import { DetailedHTMLProps, PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren<
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {
  variant?: 'activeButton' | 'inactiveButton' | 'disabledButton';
  icon?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'activeButton',
  icon = false,
  className = '',
  ...rest
}: ButtonProps) {
  const variantStyles = {
    activeButton: {
      baseClassName:
        'w-full h-full md:text-xl flex-center cursor-pointer rounded-full bg-nomad-black py-7 text-center font-semibold text-custom-gray-100 shadow-lg hover:shadow-md hover:shadow-gray-400 md:py-11',
      whileHover: {
        backgroundImage: 'linear-gradient(90deg, #47815b 0%, #112211 100%)',
      },
    },
    inactiveButton: {
      baseClassName:
        'w-full h-full border-2 border-nomad-black md:text-xl flex-center cursor-pointer rounded-full bg-white py-7 text-center font-semibold text-nomad-black shadow-lg hover:shadow-gray-400 hover:shadow-md md:py-11',
      whileHover: {
        backgroundImage: 'linear-gradient(90deg, #112211 0%, #ffffff 100%)',
      },
    },
    disabledButton: {
      baseClassName:
        'w-full h-full md:text-xl flex-center cursor-not-allowed rounded-full bg-gray-300 py-7 text-center font-semibold text-custom-gray-100 hover:shadow-gray-400 shadow-lg hover:shadow-md md:py-11',
      whileHover: {
        backgroundImage: 'linear-gradient(90deg, #787878 0%, #444444 100%)',
      },
    },
  };

  const { baseClassName, whileHover } =
    variantStyles[variant] || variantStyles.activeButton;

  return (
    <motion.div
      className={`${baseClassName} ${className}`}
      whileHover={whileHover}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 1.0 }}
    >
      <button className={variant} {...rest}>
        {children}
      </button>
      {icon && <PaperPlaneIcon width={25} height={25} className="ml-6" />}
    </motion.div>
  );
}
