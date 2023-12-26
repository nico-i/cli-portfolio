import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface Image {
  alt: string;
  imageData: IGatsbyImageData;
}

export interface IconLink {
  url: string;
  text: string;
  svgHtml: string;
}

export interface Project {
  locale: string;
  title: string;
  headerImage: Image;
  tldr: string;
  summary: string;
  iconLinks?: IconLink[];
}

export interface ProjectsByLocale {
  [locale: string]: Project[];
}
