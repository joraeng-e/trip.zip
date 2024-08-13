import DateTime from '@/components/ActivitiyForm/DateTime';
import ImageUploader from '@/components/ActivitiyForm/ImageUpload';
import BaseModal from '@/components/ActivityDetail/BaseModal';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import { postActivities } from '@/libs/api/activities';
import { CATEGORY_OPTIONS } from '@/libs/constants/categories';
import { activitiesSchema } from '@/libs/utils/schemas/activitiesSchema';
import type { ActivitiesFormData } from '@/libs/utils/schemas/activitiesSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Category,
  PostActivitiesRequest,
  PostActivitiesResponse,
} from '@trip.zip-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UseFormProps } from 'react-hook-form';

import Button from '../../../../components/commons/Button';
import Input from '../../../../components/commons/Input/Input';
import Textarea from '../../../../components/commons/Input/Textarea';
import Modal from '../../../../components/commons/Modal';
import Select from '../../../../components/commons/Select';

export default function MyActivityForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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

  const { mutate, isPending } = useMutation({
    mutationFn: postActivities,
    onSuccess: (data: PostActivitiesResponse) => {
      console.log('등록 성공', data);
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
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

  const onSubmit: SubmitHandler<ActivitiesFormData> = async ({
    subImageUrls,
    ...rest
  }) => {
    const requestData: PostActivitiesRequest = {
      ...rest,
      category: category as Category,
      address,
      subImageUrls:
        subImageUrls?.filter((url): url is string => typeof url === 'string') ||
        null,
    };
    mutate(requestData);
  };

  const handleCategoryChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(value as Category);
    setValue('category', value as Category);
    trigger('category');
  };

  const handleAddressSelect = (data: Address) => {
    setAddress(data.address);
    setValue('address', data.address);
    trigger('address');
    setIsAddressModalOpen(false);
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    if (isSuccessMessage) router.push('/mypage/myActivities');
  };

  const {
    title,
    category: categoryError,
    description,
    price,
    bannerImageUrl,
    subImageUrls,
  } = errors;

  return (
    <MyPageLayout>
      <FormProvider {...methods}>
        <form className="mb-60 px-10" onSubmit={handleSubmit(onSubmit)}>
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
              type="number"
              placeholder="가격"
              register={register('price')}
              maxWidth="792px"
              error={price}
            />
            <h3>주소</h3>
            <div className="flex items-center">
              <Input
                name="address"
                type="text"
                placeholder="주소"
                register={register('address')}
                error={errors.address}
                disabled={true}
                maxWidth="765px"
              />
              <Button
                className="ml-10 mt-3 h-[56px] max-w-80 rounded-md"
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
              >
                검색
              </Button>
            </div>
            <input
              name="detailAddress"
              type="text"
              placeholder="상세 주소"
              className="basic-input max-w-792"
            />
            <BaseModal
              isOpen={isAddressModalOpen}
              onClose={() => setIsAddressModalOpen(false)}
              className="w-full max-w-600 px-24 py-45"
            >
              <DaumPostcode onComplete={handleAddressSelect} />
            </BaseModal>
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
        </form>
      </FormProvider>
    </MyPageLayout>
  );
}
