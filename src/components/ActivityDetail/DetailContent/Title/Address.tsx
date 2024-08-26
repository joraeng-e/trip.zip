import { LocationIcon } from '@/libs/utils/Icon';

interface AddressProps {
  address: string;
  onClick: () => void;
}

export default function Address({ address, onClick }: AddressProps) {
  return (
    <div
      className="dark-base ml-20 flex cursor-pointer items-center gap-10"
      onClick={onClick}
    >
      <LocationIcon className="fill-nomad-black dark:fill-white" />
      <div>{address}</div>
    </div>
  );
}
