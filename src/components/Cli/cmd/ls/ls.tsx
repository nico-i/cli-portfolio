import { CliCmd, UsageTuple } from '@/components/Cli/cmd/types/CliCmd';
import { Fragment, ReactNode } from 'react';
import { allFileNames } from '../../files';

export class Ls extends CliCmd {
  get fileName(): string {
    return `ls`;
  }

  get usages(): UsageTuple {
    return {
      usage: this.fileName,
      i18nKey: `cmd.ls`,
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
