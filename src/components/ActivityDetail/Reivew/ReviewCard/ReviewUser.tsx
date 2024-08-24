import BaseImage from '@/../public/imgs/baseProfile.png';
import Image from 'next/image';

interface ReviewUserProps {
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
}

export default function ReviewUser(props: ReviewUserProps) {
  const { nickname, profileImageUrl, createdAt } = props;
  return (
    <div className="mt-4 flex min-w-200 gap-12 md:min-w-300">
      <div className="relative h-40 w-40 overflow-hidden rounded-full">
        <Image
          src={profileImageUrl ? profileImageUrl : BaseImage}
          alt={nickname}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <div className="text-lg-bold text-nomad-black dark:text-white">
          {nickname}
        </div>
        <div className="text-lg-regular text-custom-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
