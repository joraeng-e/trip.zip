import Button from '../commons/Button';

export default function activitiesManagementPage() {
  return (
    <div>
      <div className="mb-24 flex items-center justify-between">
        <h1 className="text-3xl-bold">내 체험 등록</h1>
        <Button type="submit" className="max-w-120 rounded-md" hasICon={true}>
          체험 등록하기
        </Button>
      </div>
    </div>
  );
}
