import ActivityGuide from '@/components/recommend/ActivityGuide';
import BannerImage from '@/components/recommend/BannerImage';
import GoBackButton from '@/components/recommend/GoBackButton';
import Introduction from '@/components/recommend/Introduction';
import RecommendLayout from '@/components/recommend/Layout';
import RelatedInfo from '@/components/recommend/RelatedInfo';

const RELATED_INFO = [
  {
    image: '/imgs/recommend/summer-concert.png',
    title: '기획공연 <어린이 과학마술 콘서트&추억의 변사극>',
    date: '2024.08.23 ~ 2024.08.24',
    href: 'http://sokchocf.or.kr/sokchocf/event/information',
  },
  {
    image: '/imgs/recommend/summer-edu.png',

    title:
      '2024 인문학프로그램 제2강 <만해와 건봉사, 그리고 봉명학교의 문화적 의미>',
    date: '2024.06.19 ~ 2024.11.29',
    href: 'http://sokchocf.or.kr/sokchocf/event/information',
  },
  {
    image: '/imgs/recommend/summer-festival.png',

    title: '2024 실향민문화축제',
    date: '2024.09.12 ~ 2024.09.28',
    href: 'http://sokchocf.or.kr/sokchocf/event/information',
  },
];

export default function SummerRecommend() {
  return (
    <>
      <BannerImage src="/imgs/carousel/summer.png">
        <Introduction>
          <h1 className="text-28 font-bold leading-32">
            여름 휴가의 완벽한 시작
          </h1>
          <div className="hidden md:block">
            <br />
            <br />
            여름은 가족, 친구들과 함께 소중한 추억을 만들기 가장 좋은
            계절입니다.
            <br />
            뜨거운 태양 아래에서 즐길 수 있는 다양한 나들이 활동들이 여러분을
            기다리고 있습니다.
            <br />
            시원한 바다의 파도 소리, 짜릿한 물놀이의 즐거움, 그리고 아름다운
            자연 속에서의 산책을 경험해 보세요.
            <br />
            <br />
            <strong>여름휴가.zip</strong>과 함께 이 여름을 잊지 못할 추억으로
            가득 채워보세요!
          </div>
        </Introduction>
      </BannerImage>

      <RecommendLayout>
        <ActivityGuide
          id={2451}
          description="맑고 푸른 바다에서 수영과 해변 활동을 즐길 수 있는 최고의 장소입니다."
          tags={['속초', '해수욕장']}
        />
        <ActivityGuide
          id={2214}
          direction="right"
          description="루피 쿠키 만들기 체험은 어린이와 가족이 함께 즐길 수 있는 재미있고 창의적인 활동입니다.<br />사랑스러운 루피 캐릭터를 테마로 한 쿠키를 직접 만들어 보며, baking의 기초를 배우고, 특별한 추억을 만들어보세요!"
        />
        <ActivityGuide
          id={2452}
          description="속초 중앙시장은 동해안의 신선한 해산물과 다양한 지역 특산물을 만나볼 수 있는 전통 시장입니다.<br />이곳은 속초의 대표적인 먹거리 명소로, 지역 주민들과 관광객들이 함께 찾는 활기찬 장소입니다.<br />시장은 다양한 음식점과 상점들이 즐비해 있어, 속초의 맛과 문화를 체험할 수 있는 최적의 장소입니다."
        />
        <ActivityGuide
          id={2454}
          direction="right"
          description="속초 해수욕장은 여름철에 다양한 수상 액티비티를 즐길 수 있는 인기 장소입니다.<br />특히 '빠지'(바다에서의 수상 액티비티) 체험은 많은 관광객들에게 사랑받고 있습니다."
        />

        <RelatedInfo data={RELATED_INFO} />

        <GoBackButton />
      </RecommendLayout>
    </>
  );
}
