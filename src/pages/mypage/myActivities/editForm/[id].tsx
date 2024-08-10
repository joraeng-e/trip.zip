import DateTime from '@/components/ActivitiyForm/DateTime';
import type { DateTimeInput } from '@/components/ActivitiyForm/DateTime';
import ImageUploader from '@/components/ActivitiyForm/ImageUpload';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import Textarea from '@/components/commons/Input/Textarea';
import Modal from '@/components/commons/Modal';
import Select from '@/components/commons/Select';
import MyPageLayout from '@/components/mypage/MyPageLayout';
import { getActivityDetail } from '@/libs/api/activities';
import { patchMyActivity } from '@/libs/api/myActivities';
import { CATEGORY_OPTIONS } from '@/libs/constants/categories';
import {
  ActivitiesFormData,
  activitiesSchema,
} from '@/libs/utils/schemas/activitiesSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category, PatchMyActivityRequest } from '@trip.zip-api';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function EditActivityForm() {
  const router = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState('');
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<DateTimeInput[]>([]);

  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [subImageUrlsToAdd, setSubImageUrlsToAdd] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const queryClient = useQueryClient();
  const activityId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const { data: activityData, isLoading } = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivityDetail(activityId!),
    enabled: !!activityId,
  });

  const methods = useForm<ActivitiesFormData>({
    resolver: yupResolver(activitiesSchema),
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (activityData) {
      setValue('title', activityData.title);
      setValue('category', activityData.category);
      setValue('description', activityData.description);
      setValue('price', activityData.price);
      setValue('address', activityData.address);
      setCategory(activityData.category);
    }
  }, [activityData, setValue]);

  const updateActivityMutation = useMutation({
    mutationFn: ({
      activityId,
      data,
    }: {
      activityId: number;
      data: PatchMyActivityRequest;
    }) => patchMyActivity({ activityId, data }),
    onSuccess: () => {
      if (activityId !== undefined) {
        queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
        queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      }
      setModalMessage('체험이 성공적으로 수정되었습니다.');
      setIsModalOpen(true);
    },
    onError: () => {
      setModalMessage('체험 수정 중 오류가 발생했습니다.');
      setIsModalOpen(true);
    },
  });

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value as Category;
    setCategory(selectedCategory);
    setValue('category', selectedCategory);
  };

  const onSubmit = (data: ActivitiesFormData) => {
    if (!activityId) {
      setModalMessage('유효하지 않은 체험 ID입니다.');
      setIsModalOpen(true);
      return;
    }

    const formData: PatchMyActivityRequest = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: data.price,
      address: data.address,
      bannerImageUrl: data.bannerImageUrl,
      subImageIdsToRemove,
      subImageUrlsToAdd,
      scheduleIdsToRemove,
      schedulesToAdd,
    };
    updateActivityMutation.mutateAsync({ activityId, data: formData });
  };

  const handleScheduleRemove = (scheduleId: number) => {
    setScheduleIdsToRemove((prev) => [...prev, scheduleId]);
  };

  const handleScheduleAdd = (newSchedule: DateTimeInput) => {
    setSchedulesToAdd((prev) => [...prev, newSchedule]);
  };

  const handleImageRemove = (imageId: number) => {
    setSubImageIdsToRemove((prev) => [...prev, imageId]);
  };

  const handleImageUploadSuccess = (uploadedUrl: string) => {
    setSubImageUrlsToAdd((prevUrls) => [...prevUrls, uploadedUrl]);
  };

  const resetModalMessage = () => {
    setModalMessage('');
    setIsModalOpen(false);
    router.push('/mypage/myActivities');
  };

  if (isLoading) return <div>Loading...</div>;
  if (!activityData) return <div>체험 정보를 찾을 수 없습니다.</div>;

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
            <Button
              type="submit"
              className="max-w-120 rounded-md"
              hasICon={true}
              disabled={updateActivityMutation.isPending}
            >
              {updateActivityMutation.isPending ? '수정 중...' : '수정하기'}
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
              options={CATEGORY_OPTIONS}
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
            <Input
              name="price"
              type="number"
              placeholder="가격"
              register={register('price')}
              maxWidth="792px"
              error={errors.price}
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
                activityData.bannerImageUrl
                  ? [{ id: 0, imageUrl: activityData.bannerImageUrl }]
                  : []
              }
            />
            <h3>소개 이미지</h3>
            <div className="flex flex-wrap">
              <ImageUploader
                name="subImageUrlsToAdd"
                maxImages={4}
                label="소개 이미지 등록"
                existingImages={activityData.subImages}
                onImageRemove={handleImageRemove}
                onSuccess={handleImageUploadSuccess}
              />
            </div>
            <p className="text-custom-gray-800">
              *이미지는 최대 4개까지 등록 가능합니다.
            </p>
          </div>
          {updateActivityMutation.isError && (
            <p className="mt-4 text-red-500">
              체험 수정 중 오류가 발생했습니다.
            </p>
          )}
        </form>
      </FormProvider>
    </MyPageLayout>
  );
}
