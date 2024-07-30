import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    function handleChange() {
      setMatches(matchMedia.matches);
    }
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};
