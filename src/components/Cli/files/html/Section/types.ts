import { StrapiCollection } from '@/util/types';

export const SectionCollectionName = `Section`;

export interface Section extends StrapiCollection {
  name: string;
  text: string;
}
