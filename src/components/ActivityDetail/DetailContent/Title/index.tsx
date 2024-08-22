// components/Title.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Address from './Address';
import Category from './Category';
import Rating from './Rating';
import TitleText from './TitleText';

interface TitleProps {
  title: string;
  address: string;
  category: string;
  rating: number;
  reviewCount: number;
  isSameUser: boolean;
}

export default function Title(props: TitleProps) {
  const { title, address, category, rating, reviewCount, isSameUser } = props;
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      router.push('/mypage/myActivities');
      setValue('');
    }
  }, [value]);

  const handleClickClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('주소가 클립보드에 복사되었습니다!');
    });
  };

  return (
    <div className="mx-16 mt-16 flex-col">
      <Category category={category} />
      <TitleText
        title={title}
        isSameUser={isSameUser}
        setValue={setValue}
        value={value}
      />
      <div className="flex">
        <Rating rating={rating} reviewCount={reviewCount} />
        <Address address={address} onClick={handleClickClipboard} />
      </div>
    </div>
  );
}
