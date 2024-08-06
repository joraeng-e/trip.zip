import { ReactNode } from 'react';

export default function CarouselSlide({ children }: { children: ReactNode }) {
  return (
    <section className="relative size-full">
      <div className="absolute inset-0">{children}</div>
    </section>
  );
}
