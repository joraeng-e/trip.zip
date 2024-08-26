import DropdownMenu from './DropdownMenu';

interface TitleTextProps {
  title: string;
  isSameUser: boolean;
  setValue: (value: string) => void;
  value: string;
}

export default function TitleText({
  title,
  isSameUser,
  setValue,
  value,
}: TitleTextProps) {
  return (
    <div className="relative mb-16 mt-10 flex items-center justify-between text-2xl-bold text-nomad-black dark:text-white">
      {title}
      {isSameUser && <DropdownMenu selected={value} setSelected={setValue} />}
    </div>
  );
}
