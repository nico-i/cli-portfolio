import { ReactNode } from 'react';

class IconTitleUrlTuple {
  icon: ReactNode;
  title: string;
  url: string;

  constructor(icon: ReactNode, title: string, url: string) {
    this.icon = icon;
    this.title = title;
    this.url = url;
  }
}

export class Project {
  title: string;
  iconTitleUrlTuples: IconTitleUrlTuple[];
  additionalInfo?: string[];
  shortSummary: string;
  fullSummary?: ReactNode;

  constructor(
    title: string,
    iconTitleUrlTuples: IconTitleUrlTuple[],
    summary: string,
    additionalInfo?: string[],
    readMoreChildren?: ReactNode,
  ) {
    this.iconTitleUrlTuples = iconTitleUrlTuples;
    this.additionalInfo = additionalInfo;
    this.shortSummary = summary;
    this.fullSummary = readMoreChildren;
    this.title = title;
  }
}
