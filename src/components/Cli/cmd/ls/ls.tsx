import { CliCmd } from '@/components/Cli/cmd/CliCmd';
import { Fragment, ReactNode } from 'react';
import { allFileNames } from '../../files';

export class Ls extends CliCmd {
  get fileName(): string {
    return `ls`;
  }

  get usages() {
    return {
      usage: this.fileName,
      description: `Lists accessible files`,
    };
  }

  public run = (): ReactNode =>
    allFileNames.map((fileName) => (
      <Fragment key={fileName}>
        {fileName}
        <br />
      </Fragment>
    ));
}
