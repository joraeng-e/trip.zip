import { ReactNode } from 'react';

export default function ActivitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative -top-57 overflow-visible px-20 md:px-24 xl:m-auto xl:w-1240 xl:px-20">
      {children}
    </div>
  );
}
