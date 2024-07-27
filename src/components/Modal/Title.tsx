import { ModalProps } from '@/types/modaltype';

export default function ModalTitle(props: ModalProps) {
  const { children, className } = props;
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}
