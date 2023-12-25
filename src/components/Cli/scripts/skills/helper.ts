import { Skill, SkillsByLocale } from '@/components/Cli/scripts/skills/types';

export function parseSkills(data: any): SkillsByLocale {
  const skillsByLocale: SkillsByLocale = {};
  data.allStrapiSkill.nodes.forEach((node: any) => {
    if (!skillsByLocale[node.locale]) {
      skillsByLocale[node.locale] = [];
    }

    const defaultLocaleSkill: Skill = {
      locale: node.locale,
      name: node.name,
      proficiency: node.proficiency,
      description: node.summary,
      url: node.icon_link.url,
    };

    skillsByLocale[node.locale].push(defaultLocaleSkill);

    node.localizations.data.forEach((localization: any) => {
      const { locale, summary, name } = localization.attributes;
      if (!skillsByLocale[locale]) {
        skillsByLocale[locale] = [];
      }
      skillsByLocale[locale].push({
        ...defaultLocaleSkill,
        locale,
        description: summary || defaultLocaleSkill.description,
        name: name || defaultLocaleSkill.name,
      });
    });
  });
  return skillsByLocale;
}
