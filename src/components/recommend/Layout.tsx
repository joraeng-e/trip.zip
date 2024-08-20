import { ReactNode } from 'react';

export default function RecommendLayout({ children }: { children: ReactNode }) {
  return (
    <main className="px-20 md:px-24 xl:m-auto xl:w-1240 xl:px-20">
      {children}
    </main>
  );
}
