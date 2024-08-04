import { useState } from 'react';

interface DescriptionProps {
  description: string;
  maxLength?: number;
}

export default function Description(props: DescriptionProps) {
  const { description, maxLength = 100 } = props;

  const [isExpanded, setIsExpanded] = useState(false); // 내용이 확장되었는지 여부

  const handleTextDisplay = isExpanded
    ? description
    : `${description.slice(0, maxLength)}...`;

  return (
    <>
      <div className="contour"></div>
      <div className="m-16">
        <h2 className="mb-16 mt-20 text-xl-bold text-nomad-black">체험 설명</h2>
        <div className="text-lg-regular text-nomad-black">
          {handleTextDisplay}
        </div>
        {/* 더 보기 버튼 */}
        {description.length > maxLength && !isExpanded && (
          <button
            className="mt-2 text-custom-gray-700"
            onClick={() => setIsExpanded(true)}
          >
            더 보기
          </button>
        )}
        {isExpanded && (
          <button
            className="mt-2 text-custom-gray-700"
            onClick={() => setIsExpanded(false)}
          >
            접기
          </button>
        )}
      </div>
    </>
  );
}
