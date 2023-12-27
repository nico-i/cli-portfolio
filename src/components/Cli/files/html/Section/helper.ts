interface Section {
  locale: string;
  name: string;
  text: string;
}

interface SectionsByLocale {
  [locale: string]: Section[];
}

export const parseSections = (data: any): SectionsByLocale => {
  const sectionsByLocale: SectionsByLocale = {};
  data.allStrapiSection.nodes.forEach((node: any) => {
    if (!sectionsByLocale[node.locale]) {
      sectionsByLocale[node.locale] = [];
    }

    const defaultLocaleSection: Section = {
      locale: node.locale,
      name: node.name,
      text: node.text.data.text,
    };

    sectionsByLocale[node.locale].push(defaultLocaleSection);

    node.localizations.data.forEach((localization: any) => {
      const { locale, text } = localization.attributes;
      if (!sectionsByLocale[locale]) {
        sectionsByLocale[locale] = [];
      }
      sectionsByLocale[locale].push({
        ...defaultLocaleSection,
        locale,
        text: text || defaultLocaleSection.text,
      });
    });
  });
  return sectionsByLocale;
};
