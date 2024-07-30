import Button from '@/components/button';
import Input from '@/components/input/Input';
import Textarea from '@/components/input/Textarea';
import { schema } from '@/libs/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import DateTime from './DateTime';
import ImageUploader from './ImageUpload';
import Address from './address';

export default function PostActivities() {
  //   const {
  //     register,
  //     formState: { errors },
  //   } = useForm<PostActivitiesRequest>({
  //     resolver: yupResolver(schema),
  //   });
  return (
    <div className="basic-container">
      <div className="mb-24 flex items-center justify-between">
        <h1 className="text-3xl-bold">내 체험 등록</h1>
        <Button variant="activeButton" className="w-120" hasICon={true}>
          등록하기
        </Button>
      </div>
      <div className="flex flex-col gap-24 [&>h3]:text-2xl-bold">
        <Input name="title" type="text" placeholder="제목" />
        <p>카테고리</p>
        <Textarea name="content" placeholder="설명" />
        <h3>가격</h3>
        <Input name="price" type="number" placeholder="가격" />
        <h3>주소</h3>
        <Address />
        <h3 className="text-2xl-bold">예약 가능한 시간대</h3>
        <DateTime />
        <h3 className="text-2xl-bold">배너 이미지</h3>
        <ImageUploader maxImages={1} label="배너 이미지 등록" />
        <h3>소개 이미지</h3>
        <ImageUploader maxImages={4} label="소개 이미지 등록" />
        <p className="text-custom-gray-800">
          *이미지는 최대 4개까지 등록 가능합니다.
        </p>
      </div>
    </div>
  );
}
