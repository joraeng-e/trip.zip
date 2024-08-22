interface ReservationUserProps {
  userData: {
    nickname: string;
    email: string;
  };
}

export default function ReservationUser(props: ReservationUserProps) {
  const { userData } = props;

  return (
    <div className="dark-border my-20 rounded-lg py-20 shadow-lg">
      <div className="ml-20 text-xl-bold">예약자 정보</div>
      <div className="my-10 ml-20">
        <div className="mb-4 text-lg-medium">예약자: {userData?.nickname}</div>
        <div className="text-lg-medium">이메일: {userData?.email}</div>
      </div>
    </div>
  );
}
