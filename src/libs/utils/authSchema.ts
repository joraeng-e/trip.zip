import * as yup from 'yup';

export const authSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일은 필수입니다.'),
  nickname: yup
    .string()
    .max(10, '열 자 이하로 작성해주세요.')
    .required('닉네임은 필수입니다.'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해주세요.')
    .required('비밀번호는 필수입니다.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수입니다.'),
});
