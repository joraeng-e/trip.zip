import { RefObject, useEffect, useState } from 'react';

export default function useIntersectionObserver(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsIntersecting(true);
          else setIsIntersecting(false);
        });
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref.current]);

  return isIntersecting;
}
