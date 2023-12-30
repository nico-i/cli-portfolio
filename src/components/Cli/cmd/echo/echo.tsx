import { CliCmd, RunProps, UsageTuple } from '@/components/Cli/cmd/CliCmd';
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

  public run({ flags, values }: RunProps): ReactNode {
    if (Object.keys(flags).length > 0) {
      throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
    }
    if (values.length !== 1) {
      throw new Error(`Expected 1 argument, got ${values.length}`);
    }
    if (
      (values.length === 1 &&
        (!values[0].startsWith(`"`) ||
          !values[0].endsWith(`"`) ||
          values[0].length < 2)) ||
      (values.length >= 2 &&
        (!values[0].startsWith(`"`) ||
          !values[values.length - 1].endsWith(`"`)))
    ) {
      throw new Error(`Invalid input, expected "string"`);
    }

    return <div>{values.join(` `).replace(/"/g, ``) || <>&nbsp;</>}</div>;
  }
}
