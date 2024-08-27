import { useEffect, useState } from 'react';

const useExtractTags = (content: string) => {
  const [tags, setTags] = useState<string[]>([]);
  const [textWithoutTags, setTextWithoutTags] = useState<string>('');

  useEffect(() => {
    const extractedTags =
      content.match(/tag:([^\s]+)/g)?.map((tag) => tag.substring(4)) || [];

    const text = content.replace(/tag:[^\s]+/g, '').trim();

    setTags(extractedTags);
    setTextWithoutTags(text);
  }, [content]);

  return { tags, textWithoutTags };
};

export default useExtractTags;
