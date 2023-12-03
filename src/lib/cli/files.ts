import Contact from '@/components/Contact';
import { ReactNode } from 'react';

export enum TextFile {
  intro = `intro.txt`,
  about = `about.txt`,
  contact = `contact.html`,
}

export const TextFileContentByFileName: Record<TextFile, ReactNode> = {
  [TextFile.intro]: `This is the intro text`,
  [TextFile.about]: `This is the about text`,
  [TextFile.contact]: Contact(),
};

export enum StaticFiles {
  cv = `cv.pdf`,
}

export const StaticFilePathByFileName: Record<StaticFiles, string> = {
  [StaticFiles.cv]: `/cv.pdf`,
};

export const allFiles: string[] = [
  ...Object.values(TextFile),
  ...Object.values(StaticFiles),
];
