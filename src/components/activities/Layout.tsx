import { ReactNode } from 'react';

export default function ActivitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative -top-57 mx-16 overflow-visible md:mx-24 xl:m-auto xl:w-1200">
      {children}
    </div>
  );
}
