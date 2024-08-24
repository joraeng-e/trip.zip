import ActivityGuide from '@/components/recommend/ActivityGuide';
import BannerImage from '@/components/recommend/BannerImage';
import GoBackButton from '@/components/recommend/GoBackButton';
import Introduction from '@/components/recommend/Introduction';
import RecommendLayout from '@/components/recommend/Layout';
import RelatedInfo from '@/components/recommend/RelatedInfo';

const RELATED_INFO = [
  {
    image: '/imgs/recommend/seoul-commentary.png',
    title: '주말 특별 해설 <계동마님>',
    date: '2024.08.23 ~ 2024.08.24',
    href: 'https://www.mapo.go.kr/site/culture/fes/culture_onstop_fes_list',
  },
  {
    image: '/imgs/recommend/seoul-culture.png',
    title: '강좌 <북촌문화센터 북촌문화강좌>',
    date: '2024.06.19 ~ 2024.11.29',
    href: 'https://www.mapo.go.kr/site/culture/fes/culture_onstop_fes_list',
  },
  {
    image: '/imgs/recommend/seoul-hanok.png',

    title: '해설 <공공한옥해설(한국어)>',
    date: '2024.09.12 ~ 2024.09.28',
    href: 'https://www.mapo.go.kr/site/culture/fes/culture_onstop_fes_list',
  },
];

export default function SeoulRecommend() {
  return (
    <>
      <BannerImage src="/imgs/carousel/seoul.png">
        <Introduction>
          <h1 className="text-28 font-bold leading-32">서울 도심 탐험하기</h1>

          <div className="hidden md:block">
            <br />
            <br />
            서울은 수천 년의 역사와 문화를 간직한 도시입니다. 이곳은 전통과
            현대가 조화롭게 어우러져 있으며, 다양한 문화 체험과 관광 명소가
            가득합니다.
            <br />
            특히 북촌은 서울의 대표적인 관광지 중 하나로, 한옥마을과 문화재가
            밀집해 있어 많은 이들이 찾는 곳입니다.
            <br />
            <br />
            이번 나들이에서는 3호선을 타고 북촌으로 가는 특별한 여정을
            소개하겠습니다.
            <br />
            <strong>서울나들이.zip</strong>을 통해, 여러분의 기억에 남을 소중한
            추억을 만들어보세요!
          </div>
        </Introduction>
      </BannerImage>

      <RecommendLayout>
        <ActivityGuide
          id={2455}
          description="전통 한옥이 모여 있는 북촌 한옥마을은 한국의 전통 문화를 체험할 수 있는 최적의 장소입니다. 한옥 거리를 거닐며 아기자기한 카페와 공방을 찾아보세요.
          <br />
          <br />
          북촌 한옥마을은 좁은 골목길이 많아, 산책하며 다양한 한옥을 감상하는 재미가 있습니다. 특히, 골목길을 따라 걷다 보면 숨겨진 보석 같은 장소들을 발견할 수 있습니다."
        />
        <ActivityGuide
          id={2456}
          direction="right"
          description="북촌 한옥마을에서 가까운 경복궁은 조선 시대의 궁궐로, 아름다운 건축물과 정원이 인상적입니다. <br />궁궐 내에서 역사적인 이야기를 들으며 산책할 수 있습니다."
        />
        <ActivityGuide
          id={2457}
          description="도자기 만들기 체험은 한국의 전통 문화와 예술을 직접 경험할 수 있는 특별한 활동입니다. <br />도자기는 한국의 오랜 역사와 함께 발전해 온 예술 형태로, 고유한 아름다움과 실용성을 지니고 있습니다. <br />직접 도자기를 만들어보는 것은 창의력을 발휘하고, 손으로 만든 작품에 대한 특별한 애착을 느낄 수 있는 좋은 기회입니다."
        />
        <ActivityGuide
          id={2458}
          direction="right"
          description="서순라길은 서울의 아름다운 경관과 함께 걷기 좋은 산책로로, 많은 사람들이 찾는 인기 있는 명소입니다. <br />이 길은 서울의 전통과 현대가 어우러진 특별한 장소로, 자연과 문화를 동시에 즐길 수 있는 최적의 코스입니다."
        />

        <RelatedInfo data={RELATED_INFO} />

        <GoBackButton />
      </RecommendLayout>
    </>
  );
}
