import { BackIcon } from '@/libs/utils/Icon';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function GoBackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/activities');
  };

  return (
    <div className="flex-center">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClick}
        className="mb-100 flex transform items-center gap-4 rounded-full border border-gray-200 bg-nomad-black px-16 py-8 text-white shadow-lg transition-colors duration-300 hover:bg-green-800"
      >
        체험 목록으로 돌아가기
        <BackIcon />
      </motion.button>
    </div>
  );
}
