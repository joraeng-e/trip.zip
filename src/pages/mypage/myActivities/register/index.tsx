import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import Modal from '@/components/commons/Modal';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import AddressInput from '@/components/mypage/activityform/AddressInput';
import DateTime from '@/components/mypage/activityform/DateTime';
import ImageUploader from '@/components/mypage/activityform/ImageUpload';
import MarkdownEditor from '@/components/mypage/activityform/MarkdownEditor';
import Select from '@/components/mypage/activityform/Select';
import { postActivities, postActivityImage } from '@/libs/api/activities';
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
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UseFormProps } from 'react-hook-form';

export default function MyActivityForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [markdownValue, setMarkdownValue] = useState('');
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);
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

  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const { activityImageUrl } = await postActivityImage(file);
      uploadedUrls.push(activityImageUrl);
    }
    return uploadedUrls;
  };

  const onSubmit: SubmitHandler<ActivitiesFormData> = async (formData) => {
    try {
      let bannerImageUrl = '';
      if (bannerImage) {
        [bannerImageUrl] = await uploadImages([bannerImage]);
      }

      const subImageUrls = await uploadImages(subImages);
      const roundedPrice = Math.round(formData.price);
      const requestData: PostActivitiesRequest = {
        ...formData,
        price: roundedPrice,
        description: markdownValue,
        category: category as Category,
        bannerImageUrl,
        subImageUrls,
      };
      mutate(requestData);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      setModalMessage('이미지 업로드 중 오류가 발생했습니다.');
      setIsModalOpen(true);
    }
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    if (isSuccessMessage) router.push('/mypage/myActivities');
  };

  const handleBannerImageChange = (files: File[]) => {
    if (files.length > 0) {
      setBannerImage(files[0]);
      setValue('bannerImageUrl', 'selected', { shouldValidate: true });
    } else {
      setBannerImage(null);
      setValue('bannerImageUrl', '', { shouldValidate: true });
    }
  };

  const handleSubImagesChange = (files: File[]) => {
    setSubImages(files);
  };

  const {
    title,
    category: categoryError,
    price,
    bannerImageUrl,
    subImageUrls,
  } = errors;

  return (
    <MyPageLayout>
      <FormProvider {...methods}>
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
          </div>
          <div className="flex flex-col gap-20 [&>h3]:mt-20 [&>h3]:text-2xl-bold">
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
              onChange={(value) => {
                setCategory(value as Category);
                setValue('category', value as Category);
                trigger('category');
              }}
              options={CATEGORY_OPTIONS}
              placeholder="카테고리"
              error={categoryError?.message}
              maxWidth="792px"
            />
            <h3>설명</h3>
            <MarkdownEditor
              value={markdownValue}
              onChange={(val) => {
                setMarkdownValue(val || '');
                setValue('description', val || '');
                trigger('description');
              }}
            />
            {errors.description && (
              <p className="mt-2 text-xs-regular text-custom-red-200">
                {errors.description.message}
              </p>
            )}
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
            <AddressInput
              register={register}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
            />
            <h3>예약 가능한 시간대</h3>
            <DateTime />
            <h3>배너 이미지</h3>
            <ImageUploader
              name="bannerImageUrl"
              maxImages={1}
              label="배너 이미지 등록"
              onImageChange={handleBannerImageChange}
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
                onImageChange={handleSubImagesChange}
              />
            </div>
            {subImageUrls && (
              <p className="pl-8 text-xs-regular text-custom-red-200">
                {subImageUrls.message}
              </p>
            )}
            <p className="mb-20 text-custom-gray-800">
              *소개이미지는 최대 4개까지 등록 가능합니다.
            </p>
          </div>
          <div className="flex items-center justify-center gap-10 md:justify-end">
            <Button
              type="button"
              className="mt-20 max-w-120 rounded-md"
              variant="inactiveButton"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="mt-20 max-w-120 rounded-md"
              hasICon={true}
              disabled={isPending}
            >
              {isPending ? '등록 중...' : '등록'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </MyPageLayout>
  );
}
