import { Command } from '@/lib/cli/Command';
import { Fragment, ReactNode } from 'react';
import { getAllFiles } from '../../files';

export class Ls extends Command {
  constructor() {
    super([[`ls`, `Lists accessible files`]]);
  }

  public run = (): ReactNode =>
    getAllFiles().map((fileName) => (
      <Fragment key={fileName}>
        {fileName}
        <br />
      </Fragment>
    ));
}
