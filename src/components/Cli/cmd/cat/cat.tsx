import { CliCmd, RunProps } from '@/components/Cli/cmd/CliCmd';
import { allFileNames, allFilesByName } from '@/components/Cli/files';
import { ReactNode } from 'react';

export class Cat extends CliCmd {
  get fileName(): string {
    return `cat`;
  }

  get usages() {
    return {
      usage: `${this.fileName} [file]`,
      description: `Displays the contents of a file or shows a download link`,
    };
  }

  public run({ flags, values }: RunProps): ReactNode {
    if (Object.keys(flags).length > 0) {
      throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
    }
    if (values.length !== 1) {
      throw new Error(`Expected 1 argument, got ${values.length}`);
    }
    if (!allFileNames.includes(values[0])) {
      throw new Error(`Unknown file: ${values[0]}`);
    }
    return allFilesByName[values[0]].run();
  }
}
