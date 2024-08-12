import { Category } from '@trip.zip-api';
import { InferType } from 'yup';
import * as yup from 'yup';

export const activitiesSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  category: yup
    .string()
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
    .integer('가격은 정수만 입력 가능합니다.')
    .max(9999999, '가격은 1000만원 미만이어야 합니다.')
    .required('가격을 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  schedules: yup
    .array()
    .of(
      yup.object().shape({
        date: yup.string().required('날짜를 입력해주세요.'),
        startTime: yup.string().required('시작 시간을 입력해주세요.'),
        endTime: yup.string().required('종료 시간을 입력해주세요.'),
      }),
    )
    .min(1, '최소 하나의 시간대를 입력해주세요.')
    .required('시간대를 입력해주세요.'),
  bannerImageUrl: yup.string().required('배너 이미지를 등록해주세요.'),
  subImageUrls: yup
    .array()
    .of(yup.string().url('유효한 URL을 입력해주세요.'))
    .max(4, '최대 4개의 소개 이미지를 등록할 수 있습니다.')
    .nullable()
    .transform((value) => value?.filter(Boolean) || undefined),
});

export type ActivitiesFormData = InferType<typeof activitiesSchema>;
