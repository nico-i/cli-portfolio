import { ProjectsCarousel } from '@/components/Cli/scripts/projects/ProjectCarousel';
import { parseProjects } from '@/components/Cli/scripts/projects/helper';
import { StartStandaloneEvent, StopStandaloneEvent } from '@/util/types';
import { graphql, useStaticQuery } from 'gatsby';
import { useEffect } from 'react';

export const Projects = () => {
  useEffect(() => {
    window.dispatchEvent(StartStandaloneEvent);
  }, []);
  const data = useStaticQuery(getAllProjectsQuery);
  const projectsByLocale = parseProjects(data);
  return (
    <ProjectsCarousel
      onClose={() => window.dispatchEvent(StopStandaloneEvent)}
      projects={projectsByLocale.en}
    />
  );
};

const getAllProjectsQuery = graphql`
  {
    allStrapiProject {
      nodes {
        locale
        title
        headerImage {
          url
          alternativeText
          width
          height
        }
        tldr
        seoTitle
        seoImage {
          url
          alternativeText
          width
          height
        }
        summary {
          data {
            summary
          }
        }
        icon_links {
          text
          url
          svgHtml
        }
        localizations {
          data {
            attributes {
              locale
              title
              tldr
              seoTitle
              summary
            }
          }
        }
      }
    }
  }
`;
