import { ReactNode } from 'react';

export default function CarouselSlide({ children }: { children: ReactNode }) {
  return <section className="relative size-full">{children}</section>;
}
