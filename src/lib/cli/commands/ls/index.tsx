import { Command } from '@/lib/cli/Command';
import { Fragment, ReactNode } from 'react';
import { StaticFile, TextFile } from '../../files';

export class Ls extends Command {
  constructor() {
    super([[`ls`, `List files in current directory`]]);
  }

  public run = (): ReactNode =>
    [...Object.values(StaticFile), ...Object.values(TextFile)].map(
      (fileName) => (
        <Fragment key={fileName}>
          {fileName}
          <br />
        </Fragment>
      ),
    );
}
