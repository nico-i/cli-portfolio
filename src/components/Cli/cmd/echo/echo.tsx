import { ValueError } from '@/components/Cli/cmd/types';
import {
  CliCmd,
  RunProps,
  UsageTuple,
} from '@/components/Cli/cmd/types/CliCmd';
import { ReactNode } from 'react';

export class Echo extends CliCmd {
  get fileName(): string {
    return `echo`;
  }

  get usages(): UsageTuple {
    return {
      usage: `${this.fileName} "[string]"`,
      i18nKey: `cmd.echo`,
    };
  }

  expectedArgCountInterval = [1, Infinity] as [number, number];

  public run({ values }: RunProps): ReactNode {
    if (
      (values.length === 1 &&
        (!values[0].startsWith(`"`) ||
          !values[0].endsWith(`"`) ||
          values[0].length < 2)) ||
      (values.length >= 2 &&
        (!values[0].startsWith(`"`) ||
          !values[values.length - 1].endsWith(`"`)))
    ) {
      throw new ValueError(`string`, values.join(` `));
    }

    return <div>{values.join(` `).replace(/"/g, ``) || <>&nbsp;</>}</div>;
  }
}
