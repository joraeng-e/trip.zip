import ActivityGuide from '@/components/recommend/ActivityGuide';
import BannerImage from '@/components/recommend/BannerImage';
import Introduction from '@/components/recommend/Introduction';
import RecommendLayout from '@/components/recommend/Layout';
import RelatedInfo from '@/components/recommend/RelatedInfo';

const RELATED_INFO = [
  {
    image: '/imgs/recommend/food-tour-hongdae.png',
    title: '홍대로 문화로 관광으로',
    date: '2024.08.23 ~ 2024.08.24',
    href: 'https://hanok.seoul.go.kr/front/index.do',
  },
  {
    image: '/imgs/recommend/food-tour-mapo.png',
    title: '마포나루 굿 행사',
    date: '2024.06.19 ~ 2024.11.29',
    href: 'https://hanok.seoul.go.kr/front/index.do',
  },
  {
    image: '/imgs/recommend/food-tour-changjun.png',

    title: '창전동 부군당제',
    date: '2024.09.12 ~ 2024.09.28',
    href: 'https://hanok.seoul.go.kr/front/index.do',
  },
];

export default function FoodTourRecommend() {
  return (
    <>
      <BannerImage src="/imgs/carousel/steak.png" />

      <RecommendLayout>
        <Introduction>
          연남동은 서울의 숨은 보석 같은 동네로, 독특한 매력을 가진 맛집과 카페,
          그리고 다양한 체험 공방이 가득한 곳입니다.
          <br />
          이곳은 젊은이들이 사랑하는 핫플레이스로, 각양각색의 음식과 문화가
          어우러져 방문객들에게 특별한 경험을 제공합니다.
          <br />
          <br />
          맛있는 음식으로 시작해, 아늑한 카페에서의 여유로움, 그리고 창의적인
          체험 공방까지, 연남동은 여러분의 감각을 자극하는 다채로운 즐길 거리가
          넘쳐납니다.
          <br />
          <br />
          <strong>연남동 맛.zip</strong>을 통해 여러분이 연남동에서 특별한
          하루를 보낼 수 있도록 안내할게요.
          <br />
          맛과 문화가 어우러진 이곳에서 소중한 추억을 만들어보세요. 연남동의
          매력에 빠져보시길 바랍니다!
        </Introduction>

        <ActivityGuide
          id={2399}
          description="태국보다 더 맛있는 태국 쌀국수를 목표로 정성 들여 요리합니다.  <br /><br />
          [대표 메뉴] 
          <br/ >
          - 진하고 감칠맛 있는 국물, 부들부들한 수육과 함께 먹는 소고기 쌀국수 <br/ >
          - 진하고 매콤 새콤한 똠얌 쌀국수 <br/ >
          - 직접 만든 바삭하고 촉촉한 스프링롤 소이 뽀삐아<br/ >"
        />
        <ActivityGuide
          id={2398}
          direction="right"
          description="북촌 한옥마을에서 가까운 경복궁은 조선 시대의 궁궐로, 아름다운 건축물과 정원이 인상적입니다. <br />궁궐 내에서 역사적인 이야기를 들으며 산책할 수 있습니다."
        />
        <ActivityGuide
          id={2183}
          description="도자기 만들기 체험은 한국의 전통 문화와 예술을 직접 경험할 수 있는 특별한 활동입니다. <br />도자기는 한국의 오랜 역사와 함께 발전해 온 예술 형태로, 고유한 아름다움과 실용성을 지니고 있습니다. <br />직접 도자기를 만들어보는 것은 창의력을 발휘하고, 손으로 만든 작품에 대한 특별한 애착을 느낄 수 있는 좋은 기회입니다."
        />
        <ActivityGuide
          id={1985}
          direction="right"
          description="담금주 원데이 클래스는 전통적인 한국 담금주를 직접 만들어보는 체험 프로그램입니다. <br />이 클래스에서는 담금주의 역사와 제조 과정에 대해 배우고, 자신만의 담금주를 만들어볼 수 있는 기회를 제공합니다."
        />

        <RelatedInfo data={RELATED_INFO} />
      </RecommendLayout>
    </>
  );
}
