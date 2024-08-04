import { postActivities } from '@/libs/api/activities';
import { CATEGORY_OPTIONS } from '@/libs/constants/categories';
import { activitiesSchema } from '@/libs/utils/schemas/activitiesSchema';
import type { ActivitiesFormData } from '@/libs/utils/schemas/activitiesSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import {
  Category,
  PostActivitiesRequest,
  PostActivitiesResponse,
} from '@trip.zip-api';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UseFormProps } from 'react-hook-form';

import Button from '../commons/Button';
import Input from '../commons/Input/Input';
import Textarea from '../commons/Input/Textarea';
import Modal from '../commons/Modal';
import Select from '../commons/Select';
import DateTime from './FormComponents/DateTime';
import ImageUploader from './FormComponents/ImageUpload';

export default function MyActivities() {
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [category, setCategory] = useState<string>('');
  const formOptions: UseFormProps<ActivitiesFormData> = {
    resolver: yupResolver(activitiesSchema),
    mode: 'onChange',
  };

  const methods = useForm<ActivitiesFormData>(formOptions);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = methods;

  //post api 성공 or 실패하면 모달이 열려요.
  const { mutate, isPending, isError } = useMutation({
    mutationFn: postActivities,
    onSuccess: (data: PostActivitiesResponse) => {
      console.log('등록 성공', data);
      setModalMessage('체험 등록이 완료되었습니다.');
      setIsModalOpen(true);
      setIsSuccessMessage(true);
    },
    onError: (error) => {
      console.error('Error:', error);
      setModalMessage(`체험 등록 중 오류가 발생했습니다: ${error.message}`);
      setIsModalOpen(true);
      setIsSuccessMessage(false);
    },
  });

  //폼 제출
  const onSubmit: SubmitHandler<ActivitiesFormData> = async ({
    subImageUrls,
    ...rest
  }) => {
    const requestData: PostActivitiesRequest = {
      ...rest,
      category: category as Category,
      subImageUrls:
        subImageUrls?.filter((url): url is string => typeof url === 'string') ||
        null,
    };
    mutate(requestData);
  };

  //카테고리 변경하는 함수, 선택된 카테고리의 값 업데이트 & 유효성 검사
  const handleCategoryChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(value as Category);
    setValue('category', value as Category);
    trigger('category');
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    if (isSuccessMessage) router.push('/activities');
  };

  const {
    title,
    category: categoryError,
    description,
    price,
    address,
    bannerImageUrl,
    subImageUrls,
  } = errors;

  return (
    <FormProvider {...methods}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <form className="mb-60" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-24 flex items-center justify-between">
            <h1 className="text-3xl-bold">내 체험 등록</h1>
            {modalMessage && (
              <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Modal.Content>
                  <Modal.Description className="py-20 text-center">
                    {modalMessage}
                  </Modal.Description>
                  <Modal.Close onConfirm={resetModalMessage}>확인</Modal.Close>
                </Modal.Content>
              </Modal.Root>
            )}
            <Button
              type="submit"
              className="max-w-120 rounded-md"
              hasICon={true}
              disabled={isPending}
            >
              {isPending ? '등록 중...' : '등록하기'}
            </Button>
          </div>
          <div className="flex flex-col gap-20 [&>h3]:text-2xl-bold">
            <Input
              name="title"
              type="text"
              placeholder="제목"
              register={register('title')}
              error={title}
              maxWidth="792px"
            />
            <Select
              value={category}
              onChange={handleCategoryChange}
              options={CATEGORY_OPTIONS}
              placeholder="카테고리"
              error={categoryError?.message}
              maxWidth="792px"
            />
            <Textarea
              name="description"
              placeholder="설명"
              register={register('description')}
              error={description}
              maxWidth="792px"
            />
            <h3>가격</h3>
            <Input
              name="price"
              type="text"
              placeholder="가격"
              register={register('price')}
              maxWidth="792px"
              error={price}
            />
            <h3>주소</h3>
            <Input
              name="address"
              type="text"
              placeholder="주소"
              register={register('address')}
              error={address}
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
            {bannerImageUrl && (
              <p className="-mt-15 pl-8 text-xs-regular text-custom-red-200">
                {bannerImageUrl.message}
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
            {subImageUrls && (
              <p className="pl-8 text-xs-regular text-custom-red-200">
                {subImageUrls.message}
              </p>
            )}
            <p className="text-custom-gray-800">
              *이미지는 최대 4개까지 등록 가능합니다.
            </p>
          </div>
          {isError && (
            <p className="mt-4 text-red-500">
              체험 등록 중 오류가 발생했습니다.
            </p>
          )}
        </form>
      </motion.div>
    </FormProvider>
  );
}
