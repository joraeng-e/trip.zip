import { Category } from '@trip.zip-api';
import { InferType } from 'yup';
import * as yup from 'yup';

export const patchActivitySchema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  category: yup
    .mixed<Category>()
    .oneOf([
      '문화 · 예술',
      '식음료',
      '스포츠',
      '투어',
      '관광',
      '웰빙',
    ] as Category[])
    .required('카테고리를 선택해주세요.'),
  description: yup.string().required('설명을 입력해주세요.'),
  price: yup
    .number()
    .typeError('가격을 입력해주세요.')
    .positive('가격을 0보다 큰 값으로 입력해주세요.')
    .required('가격을 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  bannerImageUrl: yup.string().required('배너 이미지를 등록해주세요.'),
  subImageIdsToRemove: yup.array().of(yup.number()).default([]),
  subImageUrlsToAdd: yup
    .array()
    .of(yup.string().url('유효한 URL을 입력해주세요.'))
    .max(4, '최대 4개의 소개 이미지를 등록할 수 있습니다.')
    .default([]),
  scheduleIdsToRemove: yup.array().of(yup.number()).default([]),
  schedulesToAdd: yup
    .array()
    .of(
      yup.object().shape({
        date: yup.string().required('날짜를 입력해주세요.'),
        startTime: yup.string().required('시작 시간을 입력해주세요.'),
        endTime: yup.string().required('종료 시간을 입력해주세요.'),
      }),
    )
    .default([]),
});

export type PatchActivityFormData = InferType<typeof patchActivitySchema>;
