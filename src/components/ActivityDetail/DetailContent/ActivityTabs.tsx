interface ActivityHeaderProps {
  onScrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  sectionRefs: {
    title: React.RefObject<HTMLDivElement>;
    description: React.RefObject<HTMLDivElement>;
    address: React.RefObject<HTMLDivElement>;
    review: React.RefObject<HTMLDivElement>;
  };
  activeSection: string;
}

export default function ActivityTabs(props: ActivityHeaderProps) {
  const { onScrollToSection, sectionRefs, activeSection } = props;

  const getButtonClass = (section: string) =>
    `mr-4 mt-2 w-100 border-b-2 transition-all duration-300 ${activeSection === section ? 'border-b-2 border-blue-600' : 'border-b border-transparent'}`;

  return (
    <div className="dark-base sticky top-70 z-20 hidden h-70 w-full border-y-1 border-custom-gray-200 bg-white transition-all duration-500 dark:border-custom-black md:block">
      <div className="basic-container margin-20 flex h-full items-center justify-between">
        <div className="flex h-full space-x-4">
          <button
            className={getButtonClass('title')}
            onClick={() => onScrollToSection(sectionRefs.title)}
          >
            개요
          </button>
          <button
            className={getButtonClass('description')}
            onClick={() => onScrollToSection(sectionRefs.description)}
          >
            내용
          </button>
          <button
            className={getButtonClass('address')}
            onClick={() => onScrollToSection(sectionRefs.address)}
          >
            위치
          </button>
          <button
            className={getButtonClass('review')}
            onClick={() => onScrollToSection(sectionRefs.review)}
          >
            후기
          </button>
        </div>
      </div>
    </div>
  );
}
