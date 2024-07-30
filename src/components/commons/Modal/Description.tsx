import { ModalProps } from '@/types/modaltype';

export default function ModalDescription(props: ModalProps) {
  const { children, className } = props;

  return <p className={`my-16 text-2lg-medium ${className}`}>{children}</p>;
}
