import { IS_SERVER } from '@/libs/constants/server';
import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!IS_SERVER) {
      const matchMedia = window.matchMedia(query);

      const handleChange = () => {
        setMatches(matchMedia.matches);
      };
      handleChange();

      matchMedia.addEventListener('change', handleChange);

      return () => {
        matchMedia.removeEventListener('change', handleChange);
      };
    }
  }, [query]);

  return matches;
};
