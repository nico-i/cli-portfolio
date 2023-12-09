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
    <div className="flex flex-col gap-2">
      <div
        className={`
        flex
        justify-between`}
      >
        <div className="w-96 h-60 bg-info-400" />
        <ul>
          {project.iconTitleUrlTuples.map((tuple) => (
            <li className="flex gap-0.5" key={tuple.title}>
              {tuple.icon}
              <Link href={tuple.url}>{tuple.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="font-bold">tldr;</h3>
      <p>{project.shortSummary}</p>
      {isExpanded && project.fullSummary}
      <TextButton
        className="self-start"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? `Show less` : `Read more`}
      </TextButton>
    </div>
  );
};
