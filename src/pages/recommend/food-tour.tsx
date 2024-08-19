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
          id={2459}
          description="태국보다 더 맛있는 태국 쌀국수를 목표로 정성 들여 요리합니다.  <br /><br />
          [대표 메뉴] 
          <br/ >
          - 진하고 감칠맛 있는 국물, 부들부들한 수육과 함께 먹는 소고기 쌀국수 <br/ >
          - 진하고 매콤 새콤한 똠얌 쌀국수 <br/ >
          - 직접 만든 바삭하고 촉촉한 스프링롤 소이 뽀삐아<br/ >"
        />
        <ActivityGuide
          id={2505}
          direction="right"
          description="연남동의 숨은 보석 같은 곳, 연남살롱에서 전통과 현대가 어우러진 가정식 한식을 체험해 보세요."
        />
        <ActivityGuide
          id={2506}
          description="연남동의 분위기 있는 프렌치 비스트로, 르뱅에서 프랑스의 정통 요리를 맛보는 특별한 시간을 가져보세요. <br />
          르뱅은 연남동의 골목에 자리한 작은 프렌치 레스토랑으로, 현지의 맛을 그대로 재현한 요리와 함께 아늑한 식사 경험을 선사합니다."
        />
        <ActivityGuide
          id={2460}
          direction="right"
          description="담금주 원데이 클래스는 전통적인 한국 담금주를 직접 만들어보는 체험 프로그램입니다. <br />이 클래스에서는 담금주의 역사와 제조 과정에 대해 배우고, 자신만의 담금주를 만들어볼 수 있는 기회를 제공합니다."
        />

        <RelatedInfo data={RELATED_INFO} />
      </RecommendLayout>
    </>
  );
}
