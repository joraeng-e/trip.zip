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

const classNames = memoize(classNamesFn);

export default classNames;
