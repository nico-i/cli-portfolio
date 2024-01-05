import { StrapiCollection } from '@/util/types';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export const ProjectCollectionName = `Project`;

export interface Image {
  alt: string;
  imageData: IGatsbyImageData;
}

export interface ProjectLink {
  text: string;
  url: string;
  svgHtml: string;
}

export interface ProjectTechnology {
  name: string;
  url: string;
  svgHtml: string;
}

export interface Project extends StrapiCollection {
  title: string;
  headerImage: Image;
  start: Date;
  url: string;
  end?: Date;
  workHours: number;
  tldr: string;
  summary: string;
  technologies: ProjectTechnology[];
  links: ProjectLink[];
}

export interface ProjectsByLocale {
  [locale: string]: Project[];
}
