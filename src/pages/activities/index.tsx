import Button from '@/components/button';
import Input from '@/components/input/Input';
import Textarea from '@/components/input/Textarea';
import { schema } from '@/libs/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostActivitiesRequest } from '@trip.zip-api';
import { useForm } from 'react-hook-form';

export default function PostActivities() {
  //   const {
  //     register,
  //     formState: { errors },
  //   } = useForm<PostActivitiesRequest>({
  //     resolver: yupResolver(schema),
  //   });
  return (
    <div className="basic-container">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl-bold">내 체험 등록</h1>
        <Button variant="activeButton" className="w-[120px]" hasICon={true}>
          등록하기
        </Button>
      </div>
      <Input label="제목" name="title" type="text" placeholder="제목" />
      <p>카테고리</p>
      <Textarea label="내용" name="content" placeholder="설명" />
      <Input label="가격" name="price" type="number" placeholder="가격" />
      <p>주소</p>
      <p>예약 가능한 시간대</p>
      <p>배너 이미지</p>
      <p>소개 이미지</p>
      <p>*이미지는 최대 4개까지 등록 가능합니다.</p>
    </div>
  );
}
