import { ReactNode } from 'react';

export default function ActivitiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="mx-16 md:mx-24 xl:mx-[360px]">{children}</div>;
}
