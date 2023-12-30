import { CliFile } from '@/components/Cli/files/CliFile';
import { ProjectsCarousel } from '@/components/Cli/files/scripts/projects/ProjectCarousel';
import {
  Image,
  Project,
  ProjectCollectionName,
} from '@/components/Cli/files/scripts/projects/types';
import { parseStrapiCollectionToCollectionByLocale } from '@/util/helper';
import { StartStandaloneEvent, StopStandaloneEvent } from '@/util/types';
import { graphql, useStaticQuery } from 'gatsby';

const ProjectsRun = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiProject {
        nodes {
          id
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
        }
      }
    }
  `);
  const projectsByLocale = parseStrapiCollectionToCollectionByLocale<Project>(
    data,
    ProjectCollectionName,
    (node: any) => {
      const { alternativeText, localFile } = node.headerImage;
      const { summary } = node.summary.data;
      const headerImage: Image = {
        alt: alternativeText,
        imageData: localFile.childImageSharp.gatsbyImageData,
      };
      return {
        id: node.id,
        locale: node.locale,
        title: node.title,
        headerImage,
        tldr: node.tldr,
        summary,
        iconLinks: node.icon_links,
      };
    },
  );

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
    if (typeof window !== `undefined`) {
      window.dispatchEvent(StartStandaloneEvent);
    }
    return <ProjectsRun />;
  }
}
