import { TextButton } from '@/components/Button/TextButton/TextButton';
import { Project } from '@/components/Cli/scripts/projects/types';
import { Link } from '@/components/Link';
import { useState } from 'react';

interface ProjectSlideProps {
  project: Project;
}

export const ProjectSlide = ({ project }: Readonly<ProjectSlideProps>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`
        flex
        flex-col
        gap-2 
        md:p-3
        py-2
        w-full
        lg:w-[36rem]
        h-[32rem]
        lg:h-[27rem]
        overflow-scroll `}
    >
      <div
        className={`
        flex
        gap-2
        justify-between`}
      >
        <div className="w-full h-60 bg-info-400" />
        <ul>
          {project.iconTitleUrlTuples.map((tuple) => (
            <li className="flex gap-0.5" key={tuple.title}>
              {tuple.icon}
              <Link href={tuple.url}>{tuple.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      {isExpanded ? (
        <>
          <h3 className="font-bold">Summary</h3>
          {project.fullSummary}
        </>
      ) : (
        <>
          <h3 className="font-bold">tldr;</h3>
          <p className="h-full">{project.shortSummary}</p>
        </>
      )}
      <TextButton
        className="self-end"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? `Show less` : `Read more`}
      </TextButton>
    </div>
  );
};
