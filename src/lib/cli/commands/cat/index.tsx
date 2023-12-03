import { Command, RunProps } from '@/lib/cli/Command';
import { TxtFile, TxtFileContentByFileName, allFiles } from '@/lib/cli/files';
import { ReactNode } from 'react';

export class Cat extends Command {
  constructor() {
    super([
      [`cat [file]`, `Prints the contents of a text file to the terminal.`],
    ]);
  }

  public run({ flags, values }: RunProps): ReactNode {
    if (Object.keys(flags).length > 0) {
      throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
    }
    if (values.length !== 1) {
      throw new Error(`Expected 1 argument, got ${values.length}`);
    }
    if (!Object.values(allFiles).includes(values[0])) {
      throw new Error(`Unknown .txt file: ${values[0]}`);
    } else if (!Object.values(TxtFile).includes(values[0] as TxtFile)) {
      throw new Error(
        `This version of cat does not support ${values[0]}. Only text files are supported.`,
      );
    }
    return TxtFileContentByFileName[values[0] as TxtFile];
  }
}
