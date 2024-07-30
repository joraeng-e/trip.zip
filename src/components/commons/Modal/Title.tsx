import { ModalProps } from '@/types/modaltype';

export default function ModalTitle(props: ModalProps) {
  const { children, className } = props;
  return <h2 className={`text-2xl-bold ${className}`}>{children}</h2>;
}
