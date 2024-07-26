import { PaperPlaneIcon } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import { DetailedHTMLProps, PropsWithChildren } from 'react';

/**
 * 버튼 공용 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트의 속성들.
 * @param {'activeButton' | 'inactiveButton' | 'disabledButton'} [props.variant='activeButton'] - 버튼의 상태를 지정합니다.
 * @param {boolean} [props.icon=false] - 비행기 아이콘을 포함할지 여부를 지정합니다.
 * @param {string} [props.className=''] - 사용자 측에서 추가적인 스타일을 지정합니다.
 * @param {React.ReactNode} props.children - 버튼의 자식 요소로, 보통 버튼 텍스트가 포함됩니다.
 * @param {Object} rest - 기타 버튼 속성들로, `React.ButtonHTMLAttributes<HTMLButtonElement>`가 허용하는 모든 속성을 포함합니다.
 *
 */

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
        'w-full h-full md:text-xl flex-center cursor-not-allowed rounded-full bg-[#444444] py-7 text-center font-semibold text-custom-gray-100 hover:shadow-gray-400 shadow-lg hover:shadow-md md:py-11',
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
