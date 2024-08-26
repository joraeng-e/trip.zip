import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DescriptionProps {
  description: string;
}

export default function Description(props: DescriptionProps) {
  const { description } = props;

  return (
    <>
      <div className="contour"></div>
      <div className="m-16">
        <h2 className="detail-title mb-16 mt-20">체험 설명</h2>
        <div className="text-lg-regular text-nomad-black dark:text-white">
          <div className="markdown-content prose prose-nomad-black dark:prose-invert">
            <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
}
