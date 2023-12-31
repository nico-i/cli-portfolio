import { TextButton } from '@/components/Button/TextButton/TextButton';
import { Project } from '@/components/Cli/files/scripts/projects/types';
import { Link } from '@/components/Link';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useState } from 'react';

interface ProjectSlideProps {
  project: Project;
}

export const ProjectSlide = ({ project }: Readonly<ProjectSlideProps>) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);
  const headerImage = getImage(project.headerImage.imageData);

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
        {headerImage && (
          <GatsbyImage image={headerImage} alt={project.headerImage.alt} />
        )}
        {project.iconLinks && (
          <ul>
            {project.iconLinks?.map((iconLink) => (
              <li className="flex gap-0.5 text-neutral-0" key={iconLink.text}>
                <span
                  className="w-6 h-6"
                  dangerouslySetInnerHTML={{ __html: iconLink.svgHtml }}
                />
                <Link href={iconLink.url}>{iconLink.text}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isExpanded ? (
        <>
          <h3 className="font-bold">{t(`components.projects.summary`)}</h3>
          {project.summary}
        </>
      ) : (
        <>
          <h3 className="font-bold">{t(`components.projects.tldr`)}</h3>
          <p className="h-full">{project.tldr}</p>
        </>
      )}
      <TextButton
        className="self-end"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded
          ? t(`components.projects.show-less`)
          : t(`components.projects.read-more`)}
      </TextButton>
    </div>
  );
};
