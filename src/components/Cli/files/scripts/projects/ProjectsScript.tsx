import { ProjectsCarousel } from '@/components/Cli/files/scripts/projects/ProjectCarousel';
import {
  Image,
  Project,
  ProjectCollectionName,
  ProjectLink,
  ProjectTechnology,
} from '@/components/Cli/files/scripts/projects/types';
import { CliFile } from '@/components/Cli/files/types/CliFile';
import { parseStrapiCollectionToCollectionByLocale } from '@/util/helper';
import { StopStandaloneEvent } from '@/util/types';
import { graphql, useStaticQuery } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';

const ProjectsRun = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiProject {
        nodes {
          id
          locale
          title
          header_image {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
          tldr
          url
          summary {
            data {
              summary
            }
          }
          start
          end
          work_hours
          technologies {
            name
            svg {
              localFile {
                svg {
                  content
                }
              }
            }
            url
          }
          links {
            text
            svg {
              localFile {
                svg {
                  content
                }
              }
            }
            url
          }
        }
      }
    }
  `);

  const { i18n } = useI18next();

  const projectsByLocale = parseStrapiCollectionToCollectionByLocale<Project>(
    data,
    ProjectCollectionName,
    (node: any): Project => {
      const { alternativeText, localFile } = node.header_image || {};
      const { summary } = node.summary.data;
      const headerImage: Image = {
        alt: alternativeText,
        imageData: localFile?.childImageSharp?.gatsbyImageData,
      };
      console.log(node);
      return {
        id: node.id,
        locale: node.locale,
        title: node.title,
        headerImage,
        tldr: node.tldr,
        summary,
        start: new Date(Date.parse(node.start)),
        end: node.end ? new Date(Date.parse(node.end)) : undefined,
        url: node.url,
        workHours: node.work_hours,
        technologies: node.technologies.map(
          (technology: any): ProjectTechnology => ({
            name: technology.name,
            svgHtml: technology.svg.localFile.svg.content,
            url: technology.url,
          }),
        ),
        links: node.links.map(
          (link: any): ProjectLink => ({
            text: link.text,
            svgHtml: link.svg.localFile.svg.content,
            url: link.url,
          }),
        ),
      };
    },
  );

  return (
    <ProjectsCarousel
      onClose={() => window.dispatchEvent(StopStandaloneEvent)}
      projects={projectsByLocale[i18n.language]}
    />
  );
};

export class Projects extends CliFile {
  get fileName(): string {
    return `projects.sh`;
  }

  public isStandalone: boolean = true;

  public run() {
    return <ProjectsRun />;
  }
}
