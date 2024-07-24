import Image from 'next/image';
import React from 'react';

import next from '../../public/next.svg';

export default function Home() {
  return (
    <main className="flex h-2 w-3 text-ellipsis text-stone-300">
      <Image src={next} width={20} height={20} alt="text" />
    </main>
  );
}
