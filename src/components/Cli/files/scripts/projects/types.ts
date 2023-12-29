import { IconLink } from '@/components/Cli/files/html/contact/types';
import { StrapiCollection } from '@/util/types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export const ProjectCollectionName = `Project`;

export interface Image {
  alt: string;
  imageData: IGatsbyImageData;
}

export interface Project extends StrapiCollection {
  title: string;
  headerImage: Image;
  tldr: string;
  summary: string;
  iconLinks?: IconLink[];
}

export interface ProjectsByLocale {
  [locale: string]: Project[];
}
