import { DetailedHTMLProps, PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren<
    DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  > {
  variant?: 'activeButton' | 'inactiveButton' | 'disabledButton';
}

export default function Button({
  children,
  variant = 'activeButton',
  className = '',
  ...rest
}: ButtonProps) {
  let variantClassName = '';

  switch (variant) {
    case 'activeButton':
      variantClassName = 'activeButton';
      break;
    case 'inactiveButton':
      variantClassName = 'inactiveButton';
      break;
    case 'disabledButton':
      variantClassName = 'disabledButton';
      break;
    default:
      variantClassName = 'activeButton';
  }

  const combinedClassName = `${variantClassName} ${className}`.trim();

  return (
    <button className={combinedClassName} {...rest}>
      {children}
    </button>
  );
}
