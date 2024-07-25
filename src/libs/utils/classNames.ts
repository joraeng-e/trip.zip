type ClassNamesArgs = Array<string | { [key: string]: boolean }>;

const memoize = (fn: (...args: ClassNamesArgs) => string) => {
  const cache = new Map<string, string>();

  return (...args: ClassNamesArgs) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key) as string;

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const classNamesFn = (...args: ClassNamesArgs): string => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.join(' ');
};

/**
 * 조건부 className을 생성하는 함수입니다.
 *
 * @param {...ClassNamesArgs} args - 문자열 혹은 객체
 * @returns {string} - 생성된 className 문자열
 */
const classNames = memoize(classNamesFn);

export default classNames;
