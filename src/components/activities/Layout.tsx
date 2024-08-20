import { ReactNode } from 'react';

export default function ActivitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative -top-36 overflow-visible px-20 md:-top-57 md:px-24 xl:m-auto xl:w-1240 xl:px-20">
      {children}
    </main>
  );
}
