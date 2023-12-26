import { getAllFileContentsByFileName } from '@/components/Cli/files/helper';
import { About } from '@/components/Cli/files/html/about';
import { Contact } from '@/components/Cli/files/html/contact';
import { Intro } from '@/components/Cli/files/html/intro';

const { allFileNames: allHtmlFileNames, allFilesByName: allHtmlFilesByName } =
  getAllFileContentsByFileName(
    [About, Contact, Intro].map((File) => new File()),
  );

export { allHtmlFileNames, allHtmlFilesByName };
