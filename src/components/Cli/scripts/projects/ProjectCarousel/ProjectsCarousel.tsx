import { ProjectSlide } from '@/components/Cli/scripts/projects/ProjectSlide/ProjectSlide';
import { Project } from '@/components/Cli/scripts/projects/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface ProjectsCarouselProps {
  projects: Project[];
  onClose: () => void;
}

export const ProjectsCarousel = ({
  projects,
  onClose,
}: Readonly<ProjectsCarouselProps>) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];
  const [isDoneAnimating, setIsDoneAnimating] = useState(false);
  const [height, setHeight] = useState<string>(`0%`);
  const [width, setWidth] = useState<string>(`0%`);

  useEffect(() => {
    // handle ESC key
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === `Escape`) {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener(`keydown`, onKeydown);
    return () => document.removeEventListener(`keydown`, onKeydown);
  }, [onClose]);

  useEffect(() => {
    if (isDoneAnimating) return;
    // animate width and height expanding to 100% choppy interval
    const interval = setInterval(() => {
      if (isDoneAnimating) {
        clearInterval(interval);
        return;
      }
      const increment = 12.5;
      setHeight((prev) => {
        const prevNum = Number(prev.replace(`%`, ``));
        if (prevNum < 100) {
          return `${prevNum + increment}%`;
        }
        setIsDoneAnimating(true);
        return prev;
      });
      setWidth((prev) => {
        const prevNum = Number(prev.replace(`%`, ``));
        if (prevNum < 100) {
          return `${prevNum + increment}%`;
        }
        setIsDoneAnimating(true);
        return prev;
      });
    }, 15);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseClick = () => {
    onClose();
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
    <div
      className={`
        flex
        flex-col
        gap-2
        justify-center
        items-center
        px-2
        py-0
        my-auto
        md:py-4
        w-full
        h-full
        md:-mt-6`}
    >
      <div
        className={`
        flex
        relative
        justify-center
        gap-2`}
      >
        <button onClick={onPrevClick} className={prevBtnClassName}>
          «
        </button>
        <div
          className={`
          border
          border-neutral-0
          px-2
          pt-1
          gap-2
          flex
          flex-col
          origin-center
          `}
          style={{
            transform: `scale(${width}, ${height})`,
          }}
        >
          <div className="flex justify-between">
            <h1>{activeProject.title}</h1>
            <button className="font-bold" onClick={onCloseClick}>
              X
            </button>
          </div>
          <hr />
          <ProjectSlide project={activeProject} key={activeProject.title} />
        </div>
        <button onClick={onNextClick} className={nextBtnClassName}>
          »
        </button>
        {isDoneAnimating && (
          <>
            <span className="text-sm absolute -top-8">
              <span className="xl:hidden">- use X button to exit -</span>
              <span className="hidden xl:inline">
                - use ESC or the X button to exit -
              </span>
            </span>
            <div
              className={`
        flex
        absolute
        -bottom-8`}
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
                    className={clsx(
                      activeProjectIndex !== index && `invisible`,
                    )}
                  >{`[`}</span>
                  {index + 1}
                  <span
                    className={clsx(
                      activeProjectIndex !== index && `invisible`,
                    )}
                  >{`]`}</span>
                </button>
              ))}
              <button onClick={onNextClick} className={nextBtnClassName}>
                »
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
