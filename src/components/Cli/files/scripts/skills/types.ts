export interface Skill {
  locale: string;
  name: string;
  proficiency: number;
  description: string;
  url: string;
}

export interface SkillsByLocale {
  [locale: string]: Skill[];
}
