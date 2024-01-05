import { TextButton } from '@/components/Button';
import { Project } from '@/components/Cli/files/scripts/projects/types';
import { Link } from '@/components/Link';
import clsx from 'clsx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
  const [showMore, setShowMore] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const headerImage = getImage(activeProject.headerImage.imageData);

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
    setShowMore(false);
    setActiveProjectIndex((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (activeProjectIndex === projects.length - 1) return;
    setShowMore(false);
    setActiveProjectIndex((prev) => prev + 1);
  };

  const btnClassName = `font-bold p-1.5 h-min`;

  const prevBtnClassName = clsx(
    btnClassName,
    activeProjectIndex === 0 && `invisible pointer-events-none`,
  );

  const nextBtnClassName = clsx(
    btnClassName,
    activeProjectIndex === projects.length - 1 &&
      `invisible pointer-events-none`,
  );

  return (
    <div
      className={`
      flex
      flex-col
      justify-center
      items-center
      -mb-8
      gap-2`}
    >
      {isDoneAnimating && (
        <span className="text-sm">
          <span className="xl:hidden">{`- ${t(
            `components.projects.help-mobile`,
          )} -`}</span>
          <span className="hidden xl:inline">
            {`- ${t(`components.projects.help`)} -`}
          </span>
        </span>
      )}
      <div className="flex items-center justify-center">
        <button onClick={onPrevClick} className={prevBtnClassName}>
          «
        </button>
        <div
          className={`
          border
          border-neutral-0
          gap-2
          lg:w-7/12
          items-center
          flex
          flex-col
          lg:h-[80vh]
          h-[70vh]
          px-2.5
          relative
          `}
          style={{
            transform: `scale(${width}, ${height})`,
          }}
        >
          <div className="flex justify-center font-bold items-center pt-2 pb-1 relative w-full">
            <h1>{activeProject.title}</h1>
            <button
              className="font-bold absolute right-0 top-0 p-1.5"
              onClick={onCloseClick}
            >
              X
            </button>
          </div>
          <hr className="w-full" />
          <article
            className="
            flex
            flex-col
            gap-4
            pt-2.5
            md:pt-5
            md:px-20
            px-2.5
            pb-16
            overflow-y-scroll
            overflow-x-hidden"
          >
            {headerImage && (
              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="self-center shrink-0 md:w-11/12"
              >
                <GatsbyImage
                  image={headerImage}
                  alt={activeProject.headerImage.alt}
                  objectFit="contain"
                  imgClassName="border"
                />
              </a>
            )}
            {activeProject.links?.length > 0 && (
              <ul className="flex gap-3">
                {activeProject.links?.map((link, i) => (
                  <li
                    className="flex gap-2 text-neutral-0 items-center"
                    key={i}
                  >
                    <div
                      className="w-4 h-4"
                      dangerouslySetInnerHTML={{ __html: link.svgHtml }}
                    />
                    <Link href={link.url}>{link.text || link.url}</Link>
                  </li>
                ))}
              </ul>
            )}
            {showMore ? (
              <p>
                <h3 className="font-bold">
                  {t(`components.projects.summary`)}
                </h3>
                <ReactMarkdown
                  components={{
                    ul: ({ ...props }) => (
                      <ul className="list-disc list-inside" {...props} />
                    ),
                  }}
                >
                  {activeProject.summary}
                </ReactMarkdown>
              </p>
            ) : (
              <p>
                <h3 className="font-bold">{t(`components.projects.tldr`)}</h3>
                <p className="h-full">{activeProject.tldr}</p>
              </p>
            )}
            {showMore && activeProject.technologies?.length > 0 && (
              <p className="flex flex-col gap-2">
                <h3 className="font-bold">
                  {t(`components.projects.tech-stack`)}
                </h3>
                <ul className="flex gap-3">
                  {activeProject.technologies?.map((technology, i) => (
                    <li className="text-neutral-0" key={i}>
                      <a href={technology.url} target="_blank" rel="noreferrer">
                        <div
                          className="w-7 h-7"
                          dangerouslySetInnerHTML={{
                            __html: technology.svgHtml,
                          }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </p>
            )}
            {showMore && activeProject.technologies?.length > 0 && (
              <p className="flex flex-col gap-2">
                <h3 className="font-bold">
                  {t(`components.projects.time-frame`)}
                </h3>
                {activeProject.start.toLocaleDateString(i18n.language)}
                &nbsp;–&nbsp;
                {activeProject.end
                  ? activeProject.end.toLocaleDateString(i18n.language)
                  : t(`components.projects.present`)}
                <br />
                {`${t(`components.projects.work-hours`)}: ~${
                  activeProject.workHours
                }h`}
              </p>
            )}
          </article>
          <TextButton
            className="fixed bottom-0 right-0 p-5 mix-blend-difference"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore
              ? t(`components.projects.show-less`)
              : t(`components.projects.read-more`)}
          </TextButton>
        </div>
        <button onClick={onNextClick} className={nextBtnClassName}>
          »
        </button>
      </div>
      {isDoneAnimating && (
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
      )}
    </div>
  );
};
