import { ProjectSlide } from '@/components/Cli/scripts/projects/ProjectSlide/ProjectSlide';
import { Project } from '@/components/Cli/scripts/projects/types';
import clsx from 'clsx';
import { useState } from 'react';

interface ProjectsCarouselProps {
  projects: Project[];
  className?: string;
}

export const ProjectsCarousel = ({
  projects,
  className,
}: Readonly<ProjectsCarouselProps>) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];

  const onCloseClick = () => {
    setActiveProjectIndex(0);
  };

  const onPrevClick = () => {
    if (activeProjectIndex === 0) return;
    setActiveProjectIndex((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (activeProjectIndex === projects.length - 1) return;
    setActiveProjectIndex((prev) => prev + 1);
  };

  const prevBtnClassName = clsx(
    `font-bold`,
    activeProjectIndex === 0 && `invisible pointer-events-none`,
  );

  const nextBtnClassName = clsx(
    `font-bold`,
    activeProjectIndex === projects.length - 1 &&
      `invisible pointer-events-none`,
  );

  return (
    <div className={clsx(`flex justify-center gap-4`, className)}>
      <button onClick={onPrevClick} className={prevBtnClassName}>{`<`}</button>
      <div
        className={`
        border
        border-neutral-0
        p-2
        gap-2
        flex
        flex-col`}
      >
        <div className="flex justify-between">
          <h1>{activeProject.title}</h1>
          <button className="font-bold" onClick={onCloseClick}>
            X
          </button>
        </div>
        <hr />
        <ProjectSlide project={activeProject} key={activeProject.title} />
        <div
          className={`
        w-full
        flex
        justify-center`}
        >
          <div
            className={`
        flex`}
          >
            <button onClick={onPrevClick} className={prevBtnClassName}>
              «
            </button>
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProjectIndex(index)}
                className={clsx(activeProjectIndex === index && `font-bold`)}
              >
                <span className="sr-only">Project {index + 1}</span>
                <span
                  className={clsx(activeProjectIndex !== index && `invisible`)}
                >{`[`}</span>
                {index + 1}
                <span
                  className={clsx(activeProjectIndex !== index && `invisible`)}
                >{`]`}</span>
              </button>
            ))}
            <button onClick={onNextClick} className={nextBtnClassName}>
              »
            </button>
          </div>
        </div>
      </div>
      <button onClick={onNextClick} className={nextBtnClassName}>{`>`}</button>
    </div>
  );
};
