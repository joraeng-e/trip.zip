import Button from '@/components/button';
import Input from '@/components/input/Input';
import Textarea from '@/components/input/Textarea';
import { activitiesSchema } from '@/libs/utils/activitiesSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostActivitiesRequest } from '@trip.zip-api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import DateTime from './DateTime';
import ImageUploader from './ImageUpload';
import Address from './address';

export default function PostActivities() {
  const [schedules, setSchedules] = useState<
    PostActivitiesRequest['schedules']
  >([]);
  const [bannerImageUrl, setBannerImageUrl] = useState<string>('');
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostActivitiesRequest>({
    resolver: yupResolver(activitiesSchema),
  });

  const onSubmit: SubmitHandler<PostActivitiesRequest> = (data) => {
    const requestData = {
      ...data,
      schedules,
      bannerImageUrl,
      subImageUrls,
    };
    console.log(requestData);
    // 데이터 처리 로직 추가
  };

  return (
    <form className="basic-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-24 flex items-center justify-between">
        <h1 className="text-3xl-bold">내 체험 등록</h1>
        <Button className="w-[120px]" hasICon={true}>
          등록하기
        </Button>
      </div>
      <div className="flex flex-col gap-24 [&>h3]:text-2xl-bold">
        <Input
          name="title"
          type="text"
          placeholder="제목"
          register={register('title')}
          error={errors.title}
        />
        <Input
          name="category"
          type="text"
          placeholder="카테고리"
          register={register('category')}
          error={errors.category}
        />
        <Textarea
          name="description"
          placeholder="설명"
          register={register('description')}
          error={errors.description}
        />
        <h3>가격</h3>
        <Input
          name="price"
          type="number"
          placeholder="가격"
          register={register('price')}
          error={errors.price}
        />
        <h3>주소</h3>
        <Input
          name="address"
          type="text"
          placeholder="주소"
          register={register('address')}
          error={errors.address}
        />
        <h3>예약 가능한 시간대</h3>
        <DateTime onChange={setSchedules} />
        <h3>배너 이미지</h3>
        <ImageUploader
          maxImages={1}
          label="배너 이미지 등록"
          onChange={(urls) => setBannerImageUrl(urls[0] || '')}
        />
        <h3>소개 이미지</h3>
        <div className="flex flex-wrap">
          <ImageUploader
            maxImages={4}
            label="소개 이미지 등록"
            onChange={setSubImageUrls}
          />
        </div>
        <p className="text-custom-gray-800">
          *이미지는 최대 4개까지 등록 가능합니다.
        </p>
      </div>
    </form>
  );
}
