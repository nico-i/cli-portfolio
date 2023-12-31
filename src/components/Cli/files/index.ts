import {
  allHtmlFileNames,
  allHtmlFilesByName,
} from '@/components/Cli/files/html';
import { allImageNames, allImagesByName } from '@/components/Cli/files/images';
import {
  allScriptNames,
  allScriptsByName,
} from '@/components/Cli/files/scripts';
import {
  allStaticFileNames,
  allStaticFilesByName,
} from '@/components/Cli/files/static';
import { CliFile } from '@/components/Cli/files/types/CliFile';

const allFileNames: string[] = [
  ...allHtmlFileNames,
  ...allScriptNames,
  ...allImageNames,
  ...allStaticFileNames,
];

const allFilesByName: Record<string, CliFile> = {
  ...allScriptsByName,
  ...allHtmlFilesByName,
  ...allImagesByName,
  ...allStaticFilesByName,
};

export { allFileNames, allFilesByName };
