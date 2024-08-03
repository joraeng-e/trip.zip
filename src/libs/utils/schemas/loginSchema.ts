import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일은 필수입니다.'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해주세요.')
    .matches(/[a-z]/, '소문자가 포함되어야 합니다.')
    .matches(/[0-9]/, '숫자가 포함되어야 합니다.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, '특수문자가 포함되어야 합니다.')
    .matches(/^\S*$/, '공백을 포함할 수 없습니다.')
    .required('비밀번호는 필수입니다.'),
});
