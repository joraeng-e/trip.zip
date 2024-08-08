import CarouselIndicator from './Indicator';
import CarouselNavigator from './Navigator';
import CarouselRoot from './Root';
import CarouselSlide from './Slide';

/**
 * @example
 * ```tsx
 *export default function CarouselExample() {
 * return (
 *   <Carousel.Root>
 *     <Carousel.Slide>
 *       <div className="h-full bg-red-400">1</div>
 *     </Carousel.Slide>
 *     <Carousel.Slide>
 *       <div className="h-full bg-blue-400">2</div>
 *     </Carousel.Slide>
 *     <Carousel.Slide>
 *       <div className="h-full bg-teal-400">3</div>
 *     </Carousel.Slide>
 *     <Carousel.Navigator>
 *       {(prev, next) => (
 *         <div className="absolute left-1/2 top-1/2 z-10">
 *           <button onClick={prev}>prev</button>
 *           <button onClick={next}>next</button>
 *         </div>
 *       )}
 *     </Carousel.Navigator>
 *     <Carousel.Indicator />
 *   </Carousel.Root>
 * );
 *}
 *
 * ```
 *
 * @property {React.FunctionComponent} Root - Carousel의 루트 컴포넌트
 * @property {React.FunctionComponent} Slide - Carousel의 슬라이드 컴포넌트
 * @property {React.FunctionComponent} Navigator - Carousel의 네비게이터 컴포넌트
 * @property {React.FunctionComponent} Indicator - Carousel의 인디케이터 컴포넌트
 * @author 천권희
 */

const Carousel = {
  Root: CarouselRoot,
  Navigator: CarouselNavigator,
  Slide: CarouselSlide,
  Indicator: CarouselIndicator,
};

export default Carousel;
