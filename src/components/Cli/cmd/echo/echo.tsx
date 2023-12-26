import { CliCmd, RunProps } from '@/components/Cli/cmd/CliCmd';
import { ReactNode } from 'react';

export class Echo extends CliCmd {
  get fileName(): string {
    return `echo`;
  }

  get usages() {
    return {
      usage: `${this.fileName} "[string]"`,
      description: `Prints the provided string to the terminal`,
    };
  }

  public run({ flags, values }: RunProps): ReactNode {
    if (Object.keys(flags).length > 0) {
      throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
    }
    if (values.length === 0) {
      return ``;
    }

    if (
      (values.length === 1 &&
        (!values[0].startsWith(`"`) || !values[0].endsWith(`"`))) ||
      (values.length >= 2 &&
        (!values[0].startsWith(`"`) ||
          !values[values.length - 1].endsWith(`"`)))
    ) {
      throw new Error(`Expected string, got ${values.length}`);
    }

    return values.join(` `).replace(/"/g, ``);
  }
}
