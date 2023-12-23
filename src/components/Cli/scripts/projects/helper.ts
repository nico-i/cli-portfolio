import { ProjectsByLocale } from '@/components/Cli/scripts/projects/types';

export function parseProjects(data: any): ProjectsByLocale {
  const projectsByLocale: ProjectsByLocale = {};
  data.allStrapiProject.nodes.forEach((node: any) => {
    if (!projectsByLocale[node.locale]) {
      projectsByLocale[node.locale] = [];
    }
    const enProject = {
      locale: node.locale, // will always be en
      title: node.title,
      headerImage: {
        url: node.headerImage.url,
        alt: node.headerImage.alternativeText,
        width: node.headerImage.width,
        height: node.headerImage.height,
      },
      tldr: node.tldr,
      seoTitle: node.seoTitle,
      seoImage:
        node.seoImage !== null
          ? {
              url: node.seoImage.url,
              alt: node.seoImage.alternativeText,
              width: node.seoImage.width,
              height: node.seoImage.height,
            }
          : undefined,
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
      const { locale, title, tldr, seoTitle, summary } =
        localization.attributes;
      if (!projectsByLocale[locale]) {
        projectsByLocale[locale] = [];
      }
      projectsByLocale[locale].push({
        ...enProject,
        locale,
        title: title || enProject.title,
        tldr: tldr || enProject.tldr,
        seoTitle: seoTitle || enProject.seoTitle,
        summary: summary || enProject.summary,
      });
    });
  });
  return projectsByLocale;
}
