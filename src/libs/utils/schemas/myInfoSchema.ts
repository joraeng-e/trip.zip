import * as yup from 'yup';

export const myInfoSchema = yup.object().shape({
  nickname: yup.string().required('닉네임을 입력해 주세요.'),
  email: yup
    .string()
    .email('유효한 이메일을 입력해 주세요.')
    .required('이메일을 입력해 주세요.'),
  newPassword: yup.string().nullable(),
  reEnterPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.')
    .nullable(),
});
