import { PropsWithChildren } from 'react';

export default function ModalTitle(props: PropsWithChildren) {
  const { children } = props;
  return <h2 className="text-lg font-bold">{children}</h2>;
}
