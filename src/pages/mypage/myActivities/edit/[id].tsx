import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import Modal from '@/components/commons/Modal';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import AddressInput from '@/components/mypage/activityform/AddressInput';
import DateTime from '@/components/mypage/activityform/DateTime';
import ImageUploader from '@/components/mypage/activityform/ImageUpload';
import MarkdownEditor from '@/components/mypage/activityform/MarkdownEditor';
import Select from '@/components/mypage/activityform/Select';
import { getActivityDetail, postActivityImage } from '@/libs/api/activities';
import { patchMyActivity } from '@/libs/api/myActivities';
import { CATEGORY_OPTIONS } from '@/libs/constants/categories';
import {
  ActivitiesFormData,
  activitiesSchema,
} from '@/libs/utils/schemas/activitiesSchema';
import type { DateTimeInput } from '@/types/datetype';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Category,
  GetActivityDetailResponse,
  PatchMyActivityRequest,
} from '@trip.zip-api';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface EditActivityFormProps {
  activityData: GetActivityDetailResponse;
  activityId: number;
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const activityId = Number(id);

  try {
    const activityData = await getActivityDetail(activityId);

    if (!activityData) {
      return { notFound: true };
    }

    return {
      props: {
        activityData,
        activityId,
      },
    };
  } catch (error) {
    console.error('Error fetching activity data:', error);
    return {
      props: {
        error: 'Failed to load activity data',
      },
    };
  }
};

export default function EditActivityForm({
  activityData,
  activityId,
}: EditActivityFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [category, setCategory] = useState(activityData?.category || '');
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<DateTimeInput[]>([]);
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [markdownValue, setMarkdownValue] = useState(
    activityData?.description || '',
  );
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);

  const methods = useForm<ActivitiesFormData>({
    resolver: yupResolver(activitiesSchema),
    mode: 'onChange',
    defaultValues: {
      title: activityData?.title || '',
      category: activityData?.category,
      description: activityData?.description || '',
      price: activityData?.price || 0,
      address: activityData?.address || '',
      bannerImageUrl: activityData?.bannerImageUrl || '',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = methods;

  const updateActivityMutation = useMutation({
    mutationFn: (data: PatchMyActivityRequest) =>
      patchMyActivity({ activityId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      setModalMessage('체험이 성공적으로 수정되었습니다.');
      setIsModalOpen(true);
    },
    onError: () => {
      setModalMessage('체험 수정 중 오류가 발생했습니다.');
      setIsModalOpen(true);
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

  const onSubmit = async (data: ActivitiesFormData) => {
    try {
      let bannerImageUrl = data.bannerImageUrl;
      if (bannerImage) {
        [bannerImageUrl] = await uploadImages([bannerImage]);
      }

      const newSubImageUrls = await uploadImages(subImages);

      const roundedPrice = Math.round(data.price);

      const formData: PatchMyActivityRequest = {
        title: data.title,
        category: data.category,
        description: markdownValue,
        price: roundedPrice,
        address: data.address,
        bannerImageUrl,
        subImageIdsToRemove,
        subImageUrlsToAdd: newSubImageUrls,
        scheduleIdsToRemove,
        schedulesToAdd,
      };
      updateActivityMutation.mutate(formData);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      setModalMessage('이미지 업로드 중 오류가 발생했습니다.');
      setIsModalOpen(true);
    }
  };

  const handleScheduleRemove = (scheduleId: number) => {
    setScheduleIdsToRemove((prev) => [...prev, scheduleId]);
  };

  const handleScheduleAdd = (newSchedule: DateTimeInput) => {
    setSchedulesToAdd((prev) => [...prev, newSchedule]);
  };

  const handleBannerImageChange = (files: File[]) => {
    if (files.length > 0) {
      setBannerImage(files[0]);
      setValue('bannerImageUrl', 'temp', { shouldValidate: true });
    } else {
      setBannerImage(null);
      setValue('bannerImageUrl', '', { shouldValidate: true });
    }
  };

  const handleSubImagesChange = (files: File[]) => {
    setSubImages(files);
  };

  const handleImageRemove = (imageId: number) => {
    setSubImageIdsToRemove((prev) => [...prev, imageId]);
    setSubImages((prev) => prev.filter((_, index) => index !== imageId));
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    router.push('/mypage/myActivities');
  };

  return (
    <MyPageLayout>
      <FormProvider {...methods}>
        <form className="mb-60" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-24 flex items-center justify-between">
            <h1 className="text-3xl-bold">내 체험 수정</h1>
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
              error={errors.title}
              maxWidth="792px"
            />
            <Select
              value={category}
              onChange={(value) => {
                const selectedCategory = value as Category;
                setCategory(selectedCategory);
                setValue('category', selectedCategory);
                trigger('category');
              }}
              options={CATEGORY_OPTIONS}
              placeholder="카테고리"
              error={errors.category?.message}
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
              error={errors.price}
            />
            <h3>주소</h3>
            <AddressInput
              register={register}
              setValue={setValue}
              trigger={trigger}
              errors={errors}
            />
            <h3>예약 가능한 시간대</h3>
            <DateTime
              isEditMode={true}
              existingSchedules={activityData?.schedules || []}
              onScheduleRemove={handleScheduleRemove}
              onScheduleAdd={handleScheduleAdd}
            />
            <h3>배너 이미지</h3>
            <ImageUploader
              name="bannerImageUrl"
              maxImages={1}
              label="배너 이미지 등록"
              existingImages={
                activityData?.bannerImageUrl
                  ? [{ id: 0, imageUrl: activityData.bannerImageUrl }]
                  : []
              }
              onImageChange={handleBannerImageChange}
            />
            <h3>소개 이미지</h3>
            <div className="flex flex-wrap">
              <ImageUploader
                name="subImageUrlsToAdd"
                maxImages={4}
                label="소개 이미지 등록"
                existingImages={activityData?.subImages || []}
                onImageRemove={handleImageRemove}
                onImageChange={handleSubImagesChange}
              />
            </div>
            <p className="text-custom-gray-800">
              *소개 이미지는 최대 4개까지 등록 가능합니다.
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
              disabled={updateActivityMutation.isPending}
            >
              {updateActivityMutation.isPending ? '수정 중...' : '수정'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </MyPageLayout>
  );
}
