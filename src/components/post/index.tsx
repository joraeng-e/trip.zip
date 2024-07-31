import { activitiesSchema } from '@/libs/utils/activitiesSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostActivitiesRequest } from '@trip.zip-api';
import { useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';
import Textarea from '../commons/Input/Textarea';
import Dropdown from '../dropdown';
import DateTime from './activitiesForm/DateTime';
import ImageUploader from './activitiesForm/ImageUpload';

export default function MyActivities() {
  const [values, setValues] = useState('카테고리');
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
      <form className="center my-24" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-24 flex items-center justify-between">
          <h1 className="text-3xl-bold">내 체험 등록</h1>
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
            maxWidth="792px"
          />
          <Dropdown
            selected={values}
            setSelected={setValues}
            width={640}
            height={58}
          >
            <Dropdown.Button />
            <Dropdown.Body>
              <Dropdown.Item value="문화 예술" />
              <Dropdown.Item value="식음료" />
              <Dropdown.Item value="스포츠" />
              <Dropdown.Item value="투어" />
              <Dropdown.Item value="관광" />
              <Dropdown.Item value="웰빙" />
            </Dropdown.Body>
          </Dropdown>
          <Textarea
            name="description"
            placeholder="설명"
            register={register('description')}
            error={errors.description}
            maxWidth="792px"
          />
          <h3>가격</h3>
          <Input
            name="price"
            type="number"
            placeholder="가격"
            register={register('price')}
            error={errors.price}
            maxWidth="792px"
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
