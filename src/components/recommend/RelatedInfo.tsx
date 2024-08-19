import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: {
    image: string;
    title: string;
    date: string;
    href: string;
  }[];
}

export default function RelatedInfo({ data }: Props) {
  return (
    <>
      <h1 className="mt-200 block text-28 font-bold text-nomad-black dark:text-white md:text-32 xl:mt-[400px] xl:text-40">
        관련 행사
      </h1>

      <div className="mb-200 mt-20 flex gap-16 overflow-x-auto xl:gap-32">
        {data.map((each) => (
          <Link
            key={each.title}
            href={each.href}
            className="block w-1/3 min-w-[190px]"
          >
            <div className="relative aspect-square">
              <Image
                src={each.image}
                fill
                alt="image"
                className="absolute rounded-t-xl object-cover"
              />
            </div>

            <div className="flex h-120 flex-col rounded-b-xl bg-custom-gray-200 px-8 py-12 text-14 dark:text-black">
              <h1 className="font-bold">{each.title}</h1>
              <span className="mt-auto text-12 text-custom-gray-600">
                일정: {each.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
