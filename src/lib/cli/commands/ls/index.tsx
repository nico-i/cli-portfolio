import { Command } from '@/lib/cli/Command';
import { allFiles } from '@/lib/cli/files';
import { ReactNode } from 'react';

export class Ls extends Command {
  constructor() {
    super([[`ls`, `List files in current directory`]]);
  }

  public run = (): ReactNode =>
    allFiles.map((fileName) => (
      <>
        {fileName}
        <br />
      </>
    ));
}
