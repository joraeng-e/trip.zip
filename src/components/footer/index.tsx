import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/libs/utils/Icon';

export default function Footer() {
  return (
    <div className="bg-nomad-black px-38 pb-66 pt-32 md:gap-60 md:px-200 md:pb-108">
      <div className="flex-center flex-col gap-24 md:flex-row md:justify-between">
        <div className="flex-center w-full gap-12 md:basis-1/2 md:justify-between [&_>div]:text-[#676767]">
          <div>
            <p className="whitespace-nowrap">@codeit - 2024</p>
          </div>
          <div className="flex gap-12 md:gap-30">
            <p className="whitespace-nowrap">Privacy Policy</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className="flex-center gap-12">
          <FacebookIcon />
          <TwitterIcon className="h-20 w-20 rounded-md bg-white" />
          <YoutubeIcon />
          <InstagramIcon />
        </div>
      </div>
    </div>
  );
}
