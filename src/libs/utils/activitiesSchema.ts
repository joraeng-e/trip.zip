import * as yup from 'yup';

export const activitiesSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  category: yup.string().required('카테고리를 선택해주세요.'),
  description: yup.string().required('설명을 입력해주세요.'),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? 0 : value,
    )
    .positive('가격을 입력해주세요.'),

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
    .required('예약 가능한 시간대를 입력해주세요.')
    .min(1, '최소 하나의 시간대를 입력해주세요.'),
  bannerImageUrl: yup.string().required('배너 이미지를 등록해주세요.'),
  subImageUrls: yup
    .array()
    .of(yup.string())
    .max(4, '최대 4개의 소개 이미지를 등록할 수 있습니다.')
    .optional(),
});
