//가격 포맷 (0,000)
class FormatUtils {
  static price(price: number): string {
    return price.toLocaleString('ko-KR');
  }
}

export default FormatUtils;
