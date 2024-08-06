import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input/Input';
import Textarea from '@/components/commons/Input/Textarea';
import Select from '@/components/commons/Select';
import { getActivityDetail } from '@/libs/api/activities';
import { patchMyActivity } from '@/libs/api/myActivities';
import { CATEGORY_OPTIONS } from '@/libs/constants/categories';
import {
  PatchActivityFormData,
  patchActivitySchema,
} from '@/libs/utils/schemas/patchActivitiySchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Category,
  PatchMyActivityRequest,
  PatchMyActivityResponse,
} from '@trip.zip-api';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DateTime from '../FormComponents/DateTime';
import ImageUploader from '../FormComponents/ImageUpload';

export default function EditActivityForm() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<Category | ''>('');
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);

  const { data: activityData, isLoading } = useQuery({
    queryKey: ['activityDetail', id],
    queryFn: () => getActivityDetail(Number(id)),
    enabled: !!id,
  });

  const methods = useForm<PatchActivityFormData>({
    resolver: yupResolver(patchActivitySchema),
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
      methods.reset({
        title: activityData.title,
        category: activityData.category,
        description: activityData.description,
        price: activityData.price,
        address: activityData.address,
        bannerImageUrl: activityData.bannerImageUrl,
        subImageIdsToRemove: [],
        subImageUrlsToAdd: [],
        scheduleIdsToRemove: [],
        schedulesToAdd: [],
      });
      setCategory(activityData.category);
    }
  }, [activityData, methods]);

  const updateActivityMutation = useMutation({
    mutationFn: ({
      activityId,
      data,
    }: {
      activityId: number;
      data: FormData;
    }) => patchMyActivity({ activityId, data }),
    onSuccess: (data: PatchMyActivityResponse) => {
      console.log('체험 수정 성공:', data);
      router.push('/my-activities');
    },
    onError: (error: Error) => {
      console.error('체험 수정 중 오류 발생:', error);
    },
  });

  const onSubmit = (data: PatchActivityFormData) => {
    const formData = new FormData();

    // PatchMyActivityRequest에 맞게 데이터 변환
    const requestData: PatchMyActivityRequest = {
      ...data,
      subImageIdsToRemove: subImageIdsToRemove,
      scheduleIdsToRemove: scheduleIdsToRemove,
      subImageUrlsToAdd:
        data.subImageUrlsToAdd?.filter(
          (url): url is string => url !== undefined,
        ) ?? [],
      schedulesToAdd: data.schedulesToAdd ?? [],
    };

    Object.entries(requestData).forEach(([key, value]) => {
      if (
        key === 'subImageUrlsToAdd' ||
        key === 'schedulesToAdd' ||
        key === 'subImageIdsToRemove' ||
        key === 'scheduleIdsToRemove'
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    updateActivityMutation.mutate({ activityId: Number(id), data: formData });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value as Category;
    setCategory(value);
    setValue('category', value);
  };

  if (isLoading) return <div>Loading...</div>;

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
            <h1 className="text-3xl-bold">내 체험 수정</h1>
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
              existingSchedules={activityData?.schedules}
              onScheduleRemove={(scheduleId) =>
                setScheduleIdsToRemove((prev) => [...prev, scheduleId])
              }
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
            />
            <h3>소개 이미지</h3>
            <div className="flex flex-wrap">
              <ImageUploader
                name="subImageUrlsToAdd"
                maxImages={4}
                label="소개 이미지 등록"
                existingImages={activityData?.subImageUrls}
                onImageRemove={(imageId) =>
                  setSubImageIdsToRemove((prev) => [...prev, imageId])
                }
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
      </motion.div>
    </FormProvider>
  );
}
