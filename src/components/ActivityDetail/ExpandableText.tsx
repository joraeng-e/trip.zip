import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  isLoading?: boolean;
}

export default function ExpandableText(props: ExpandableTextProps) {
  const { text, maxLength = 100, isLoading } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTextDisplay = isExpanded
    ? text
    : text.length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;

  return (
    <div>
      <div className="dark:text-white">
        {isLoading ? (
          <>
            <div className="relative h-30"></div>
            <div className="relative h-30"></div>
          </>
        ) : (
          handleTextDisplay
        )}
      </div>
      {!isLoading && text.length > maxLength && (
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
