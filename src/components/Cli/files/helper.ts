import { CliFile } from '@/components/Cli/files/CliFile';

export const getAllFileContentsByFileName = (
  files: CliFile[],
): {
  allFileNames: string[];
  allFilesByName: Record<string, CliFile>;
} => {
  const allFileNames = files.map((file) => file.fileName);
  const allFilesByName = files.reduce(
    (acc, file) => ({ ...acc, [file.fileName]: file }),
    {},
  );
  return { allFileNames, allFilesByName };
};
