import { CliFile } from '@/components/Cli/files/CliFile';
import { ProjectsCarousel } from '@/components/Cli/files/scripts/projects/ProjectCarousel';
import { parseProjects } from '@/components/Cli/files/scripts/projects/helper';
import { StartStandaloneEvent, StopStandaloneEvent } from '@/util/types';
import { graphql, useStaticQuery } from 'gatsby';
import { useEffect } from 'react';

const ProjectsRun = () => {
  useEffect(() => {
    window.dispatchEvent(StartStandaloneEvent);
  }, []);
  const data = useStaticQuery(graphql`
    {
      allStrapiProject {
        nodes {
          locale
          title
          headerImage {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
          tldr
          seoTitle
          seoImage {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
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
  `);
  const projectsByLocale = parseProjects(data);
  return (
    <ProjectsCarousel
      onClose={() => window.dispatchEvent(StopStandaloneEvent)}
      projects={projectsByLocale.en}
    />
  );
};

export class Projects extends CliFile {
  get fileName(): string {
    return `projects.sh`;
  }

  public run() {
    return <ProjectsRun />;
  }
}
