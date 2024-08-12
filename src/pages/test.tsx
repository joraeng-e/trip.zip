import Loading from '@/components/commons/Loading';
import React, { useEffect, useState } from 'react';

export default function Test() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex w-full items-center justify-center">
      {loading ? <Loading /> : <h1>로딩 완료! 환영합니다.</h1>}
    </div>
  );
}
