import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '@/libs/utils/Icon';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-nomad-black px-38 pb-66 pt-32 md:gap-60 md:px-200 md:pb-108">
      <div className="flex-center flex-col gap-24 md:flex-row md:justify-between">
        <div className="flex-center w-full gap-12 md:basis-1/2 md:justify-between lg:basis-1/2 [&_>div]:text-[#676767]">
          <div>
            <Link href="https://github.com/joraeng-e/trip.zip">
              <p className="whitespace-nowrap">@Joraeng-e</p>
            </Link>
          </div>
          <div className="flex gap-12 md:gap-30">
            <Link href="/privacy-policy">
              <p className="whitespace-nowrap">Privacy Policy</p>
            </Link>
            <Link href="/faq">
              <p>FAQ</p>
            </Link>
          </div>
        </div>
        <div className="flex-center gap-12">
          <Link href="https://www.facebook.com">
            <FacebookIcon aria-label="페이스북" />
          </Link>
          <Link href="https://x.com">
            <TwitterIcon
              aria-label="트위터"
              className="h-20 w-20 rounded-md bg-white"
            />
          </Link>
          <Link href="https://www.youtube.com">
            <YoutubeIcon aria-label="유튜브" />
          </Link>
          <Link href="https://www.instagram.com">
            <InstagramIcon aria-label="인스타그램" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
