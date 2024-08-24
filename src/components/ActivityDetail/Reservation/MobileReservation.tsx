import Modal from '@/components/commons/Modal';
import { GetActivityDetailResponse } from '@trip.zip-api';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Button from '../../commons/Button';
import ReservationSideBar from './ReservationSideBar';

interface MobileReservationProps {
  data: GetActivityDetailResponse;
  isSameUser: boolean;
}

export default function MobileReservation(props: MobileReservationProps) {
  const { data, isSameUser } = props;

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleEditExperience = () => {
    if (isSameUser) {
      router.push('/mypage/myActivities');
    }
  };

  return (
    <>
      <div className="md:hidden">
        <div className="dark-base fixed bottom-0 left-0 right-0 h-70 border-t-2 bg-white p-10 shadow-lg">
          {!getCookie('refreshToken') && (
            <Button
              variant="activeButton"
              className="mb-2 h-36 rounded-md text-md-bold"
              onClick={handleLogin}
            >
              로그인하기
            </Button>
          )}

          {isSameUser && (
            <Button
              variant="activeButton"
              className="h-36 rounded-md text-md-bold"
              onClick={handleEditExperience}
            >
              체험 수정하기
            </Button>
          )}
          <Modal.Root>
            <Modal.Trigger>
              {getCookie('refreshToken') && !isSameUser && (
                <Button
                  variant="activeButton"
                  className="mb-2 h-36 rounded-md text-md-bold"
                >
                  예약하기
                </Button>
              )}
            </Modal.Trigger>
            <Modal.Content className="mx-10 w-full max-w-500">
              <ReservationSideBar
                detailData={data}
                className="relative bottom-0 w-400"
                isSameUser={isSameUser}
              />
            </Modal.Content>
          </Modal.Root>
        </div>
      </div>
    </>
  );
}
