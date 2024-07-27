import { PropsWithChildren } from 'react';

export default function ModalDescription(props: PropsWithChildren) {
  const { children } = props;
  return <p className="mb-4">{children}</p>;
}
