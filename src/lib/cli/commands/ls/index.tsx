import { Command } from '@/lib/cli/Command';
import { allFiles } from '@/lib/cli/files';
import { Fragment, ReactNode } from 'react';

export class Ls extends Command {
  constructor() {
    super([[`ls`, `List files in current directory`]]);
  }

  public run = (): ReactNode =>
    allFiles.map((fileName) => (
      <Fragment key={fileName}>
        {fileName}
        <br />
      </Fragment>
    ));
}
