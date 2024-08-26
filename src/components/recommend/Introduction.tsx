import { ReactNode } from 'react';

export default function Introduction({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-26 left-1/2 -translate-x-1/2 text-center leading-18 text-white">
      {children}
    </div>
  );
}
