import { postActivities } from '@/libs/api/activities';
import { activitiesSchema } from '@/libs/utils/activitiesSchema';
import FormatUtils from '@/libs/utils/formatUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import {
  Category,
  PostActivitiesRequest,
  PostActivitiesResponse,
} from '@trip.zip-api';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';
import Textarea from '../commons/Input/Textarea';
import Select from '../commons/select';
import DateTime from './activitiesForm/DateTime';
import ImageUploader from './activitiesForm/ImageUpload';

export default function MyActivities() {
  const [category, setCategory] = useState<string>('');
  const [formattedPrice, setFormattedPrice] = useState('');
  const methods = useForm<PostActivitiesRequest>({
    resolver: yupResolver(activitiesSchema) as any,
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = methods;

  const mutation = useMutation({
    mutationFn: postActivities,
    onSuccess: (data: PostActivitiesResponse) => {
      console.log('Success:', data);
      // 성공 후 처리 (예: 성공 메시지 표시, 페이지 리다이렉트 등)
    },
    onError: (error) => {
      console.error('Error:', error);
      // 에러 처리 (예: 에러 메시지 표시)
    },
  });

  const onSubmit: SubmitHandler<PostActivitiesRequest> = async (data) => {
    const requestData: PostActivitiesRequest = {
      ...data,
      category: category as Category,
    };
    mutation.mutate(requestData);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as Category;
    setCategory(value);
    setValue('category', value);
    trigger('category');
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    const price = parseInt(numericValue, 10) || 0;
    const formatted = FormatUtils.price(price);
    setFormattedPrice(formatted);
    setValue('price', price);
  };

  const categoryOptions = [
    { value: '문화 · 예술', label: '문화 · 예술' },
    { value: '식음료', label: '식음료' },
    { value: '스포츠', label: '스포츠' },
    { value: '투어', label: '투어' },
    { value: '관광', label: '관광' },
    { value: '웰빙', label: '웰빙' },
  ];

  return (
    <FormProvider {...methods}>
      <form className="mb-30" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-24 flex items-center justify-between">
          <h1 className="text-3xl-bold">내 체험 등록</h1>
          <Button
            type="submit"
            className="max-w-120"
            hasICon={true}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '등록 중...' : '등록하기'}
          </Button>
        </div>
        <div className="flex flex-col gap-20 [&>h3]:text-2xl-bold">
          <Input
            name="title"
            type="text"
            placeholder="제목"
            register={register('title')}
            error={errors.title}
            maxWidth="792px"
          />
          <Select
            value={category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            placeholder="카테고리"
            error={errors.category?.message}
            maxWidth="792px"
          />
          <Textarea
            name="description"
            placeholder="설명"
            register={register('description')}
            error={errors.description}
            maxWidth="792px"
          />
          <h3>가격</h3>
          <input
            name="price"
            type="text"
            placeholder="가격"
            value={formattedPrice}
            onChange={handlePriceChange}
            className="basic-input max-w-792"
          />
          <h3>주소</h3>
          <Input
            name="address"
            type="text"
            placeholder="주소"
            register={register('address')}
            error={errors.address}
            maxWidth="792px"
          />
          <h3>예약 가능한 시간대</h3>
          <DateTime />
          <h3>배너 이미지</h3>
          <ImageUploader
            name="bannerImageUrl"
            maxImages={1}
            label="배너 이미지 등록"
          />
          {errors.bannerImageUrl && (
            <p className="-mt-15 pl-8 text-xs-regular text-custom-red-200">
              {errors.bannerImageUrl.message}
            </p>
          )}
          <h3>소개 이미지</h3>
          <div className="flex flex-wrap">
            <ImageUploader
              name="subImageUrls"
              maxImages={4}
              label="소개 이미지 등록"
            />
          </div>
          {errors.subImageUrls && (
            <p className="pl-8 text-xs-regular text-custom-red-200">
              {errors.subImageUrls.message}
            </p>
          )}
          <p className="text-custom-gray-800">
            *이미지는 최대 4개까지 등록 가능합니다.
          </p>
        </div>
        {mutation.isError && (
          <p className="mt-4 text-red-500">체험 등록 중 오류가 발생했습니다.</p>
        )}
      </form>
    </FormProvider>
  );
}
