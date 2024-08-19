import { ReactNode } from 'react';

export default function Introduction({ children }: { children: ReactNode }) {
  return <p className="my-80 text-center leading-18">{children}</p>;
}
