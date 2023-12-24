import {
  Image,
  Project,
  ProjectsByLocale,
} from '@/components/Cli/scripts/projects/types';

export function parseProjects(data: any): ProjectsByLocale {
  const projectsByLocale: ProjectsByLocale = {};
  data.allStrapiProject.nodes.forEach((node: any) => {
    if (!projectsByLocale[node.locale]) {
      projectsByLocale[node.locale] = [];
    }
    const headerImage: Image = {
      alt: node.headerImage.alternativeText,
      imageData: node.headerImage.localFile.childImageSharp.gatsbyImageData,
    };

    const enProject: Project = {
      locale: node.locale, // will always be en
      title: node.title,
      headerImage,
      tldr: node.tldr,
      summary: node.summary.data.summary,
      iconLinks: node.icon_links
        ? node.icon_links.map((iconLink: any) => ({
            url: iconLink.url,
            text: iconLink.text,
            svgHtml: iconLink.svgHtml,
          }))
        : undefined,
    };

    projectsByLocale[node.locale].push(enProject);

    node.localizations.data.forEach((localization: any) => {
      const { locale, title, tldr, summary } = localization.attributes;
      if (!projectsByLocale[locale]) {
        projectsByLocale[locale] = [];
      }
      projectsByLocale[locale].push({
        ...enProject,
        locale,
        title: title || enProject.title,
        tldr: tldr || enProject.tldr,
        summary: summary || enProject.summary,
      });
    });
  });
  return projectsByLocale;
}
