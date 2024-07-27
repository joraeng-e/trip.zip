import { ModalProps } from '@/types/modaltype';

export default function ModalDescription(props: ModalProps) {
  const { children, className } = props;

  return (
    <p className={`mt-4 rounded bg-blue-500 px-4 py-2 text-white ${className}`}>
      {children}
    </p>
  );
}
