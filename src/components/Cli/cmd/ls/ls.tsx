import { Command } from '@/components/Cli/Command';
import { Fragment, ReactNode } from 'react';
import { getAllFiles } from '../../files';

export class Ls extends Command {
  get usages() {
    return {
      usage: `ls`,
      description: `Lists accessible files`,
    };
  }

  public run = (): ReactNode =>
    getAllFiles().map((fileName) => (
      <Fragment key={fileName}>
        {fileName}
        <br />
      </Fragment>
    ));
}
