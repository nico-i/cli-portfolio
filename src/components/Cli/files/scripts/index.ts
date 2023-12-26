import { getAllFileContentsByFileName } from '@/components/Cli/files/helper';
import { Projects } from '@/components/Cli/files/scripts/projects';
import { Skills } from '@/components/Cli/files/scripts/skills';

const { allFileNames: allScriptNames, allFilesByName: allScriptsByName } =
  getAllFileContentsByFileName([Projects, Skills].map((File) => new File()));

export { allScriptNames, allScriptsByName };
