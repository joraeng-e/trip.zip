import { useEffect, useState } from 'react';

const useExtractTags = (content: string) => {
  const [tags, setTags] = useState<string[]>([]);
  const [textWithoutTags, setTextWithoutTags] = useState<string>('');

  useEffect(() => {
    // 문자열에서 태그를 추출 (다음 #가 나타나기 전까지의 문자열)
    const extractedTags =
      content.match(/#([^\s#]+)/g)?.map((tag) => tag.substring(1)) || [];

    // 태그가 없는 문자열 생성
    const text = content.replace(/#([^\s#]+)/g, '').trim();

    setTags(extractedTags);
    setTextWithoutTags(text);
  }, [content]);

  return { tags, textWithoutTags };
};

export default useExtractTags;
