import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일을 입력해주세요')
    .required('이메일은 필수입니다'),
  password: yup.string().required('비밀번호는 필수입니다'),
  price: yup.number().required('가격은 필수입니다'),
});
