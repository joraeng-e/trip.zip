import Button from '@/components/button';
import Input from '@/components/input/Input';
import Textarea from '@/components/input/Textarea';
import { activitiesSchema } from '@/libs/utils/activitiesSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostActivitiesRequest } from '@trip.zip-api';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';

import DateTime from './activities/DateTime';
import ImageUploader from './activities/ImageUpload';

export default function PostActivities() {
  const methods = useForm<PostActivitiesRequest>({
    resolver: yupResolver(activitiesSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<PostActivitiesRequest> = (data) => {
    const requestData: PostActivitiesRequest = {
      ...data,
    };
    console.log(requestData);
    // 여기에서 API 요청을 보낼 수 있습니다.
  };

  return (
    <FormProvider {...methods}>
      <form
        className="center my-24 max-w-792"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between">
          <h1 className="mb-24 text-3xl-bold">내 체험 등록</h1>
          <Button type="submit" className="max-w-120" hasICon={true}>
            등록하기
          </Button>
        </div>
        <div className="flex flex-col gap-20 [&>h3]:text-2xl-bold">
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
          <DateTime />
          <h3>배너 이미지</h3>
          <ImageUploader
            maxImages={1}
            label="배너 이미지 등록"
            onChange={(urls) => setValue('bannerImageUrl', urls[0] || '')}
          />
          {errors.bannerImageUrl && (
            <p className="-mt-15 pl-8 text-xs-regular text-custom-red-200">
              {errors.bannerImageUrl.message}
            </p>
          )}
          <h3>소개 이미지</h3>
          <div className="flex flex-wrap">
            <ImageUploader
              maxImages={4}
              label="소개 이미지 등록"
              onChange={(urls) => setValue('subImageUrls', urls)}
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
      </form>
    </FormProvider>
  );
}
