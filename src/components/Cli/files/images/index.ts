import { getAllFileContentsByFileName } from '@/components/Cli/files/helper';
import { Selfie } from '@/components/Cli/files/images/selfie';

const { allFileNames: allImageNames, allFilesByName: allImagesByName } =
  getAllFileContentsByFileName([Selfie].map((File) => new File()));

export { allImageNames, allImagesByName };
