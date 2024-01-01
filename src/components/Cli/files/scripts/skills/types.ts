import { StrapiCollection } from '@/util/types';

export interface Skill extends StrapiCollection {
  name: string;
  proficiency: number;
  summary: string;
  priority: number;
  url: string;
}

export const SkillCollectionName = `Skill`;
