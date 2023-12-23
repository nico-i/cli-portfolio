export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
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
  seoTitle: string;
  seoImage?: Image;
  summary: string;
  iconLinks?: IconLink[];
}

export interface ProjectsByLocale {
  [locale: string]: Project[];
}
