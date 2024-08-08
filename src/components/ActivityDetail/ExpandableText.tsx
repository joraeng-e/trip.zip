import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength: number;
}

export default function ExpandableText(props: ExpandableTextProps) {
  const { text, maxLength } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextDisplay = isExpanded
    ? text
    : text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;

  return (
    <div>
      <div>{handleTextDisplay}</div>
      {text.length > maxLength && (
        <button
          className="mt-2 text-custom-gray-700"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? '접기' : '더 보기'}
        </button>
      )}
    </div>
  );
}
