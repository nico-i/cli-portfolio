import { ValueError } from '@/components/Cli/cmd/types';
import {
  CliCmd,
  RunProps,
  UsageTuple,
} from '@/components/Cli/cmd/types/CliCmd';
import { allFileNames, allFilesByName } from '@/components/Cli/files';
import { ReactNode } from 'react';

export class Cat extends CliCmd {
  get fileName(): string {
    return `cat`;
  }

  get usages(): UsageTuple {
    return {
      usage: `${this.fileName} [file]`,
      i18nKey: `cmd.cat`,
    };
  }

  expectedArgCountInterval = [1, 1] as [number, number];

  public run({ values }: RunProps): ReactNode {
    if (!allFileNames.includes(values[0])) {
      throw new ValueError(`file`, values[0]);
    }
    return allFilesByName[values[0]].run();
  }
}
