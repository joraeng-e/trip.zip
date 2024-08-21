import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DescriptionProps {
  description: string;
  maxLength?: number;
}

export default function Description(props: DescriptionProps) {
  const { description, maxLength = 100 } = props;

  return (
    <>
      <div className="contour"></div>
      <div className="m-16">
        <h2 className="dark-base mb-16 mt-20 text-xl-bold text-nomad-black">
          체험 설명
        </h2>
        <div className="dark-base text-lg-regular text-nomad-black">
          <div className="markdown-content dark-base">
            <Markdown remarkPlugins={[remarkGfm]} className="dark-base">
              {description}
            </Markdown>
          </div>
        </div>
      </div>
    </>
  );
}
