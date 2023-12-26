import { Cv } from '@/components/Cli/files/static/cv';

import { getAllFileContentsByFileName } from '@/components/Cli/files/helper';

const {
  allFileNames: allStaticFileNames,
  allFilesByName: allStaticFilesByName,
} = getAllFileContentsByFileName([Cv].map((File) => new File()));

export { allStaticFileNames, allStaticFilesByName };
