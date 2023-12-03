import Contact from '@/components/Contact';
import { ReactNode } from 'react';

export enum TxtFile {
  intro = `intro.txt`,
  about = `about.txt`,
  contact = `contact.html`,
}

export const TxtFileContentByFileName: Record<TxtFile, ReactNode> = {
  [TxtFile.intro]: `This is the intro text`,
  [TxtFile.about]: `This is the about text`,
  [TxtFile.contact]: Contact(),
};

export enum StaticFiles {
  cv = `cv.pdf`,
}

export const StaticFilePathByFileName: Record<StaticFiles, string> = {
  [StaticFiles.cv]: `/cv.pdf`,
};

export const allFiles: string[] = [
  ...Object.values(TxtFile),
  ...Object.values(StaticFiles),
];
