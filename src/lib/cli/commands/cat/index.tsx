import Link from '@/components/Link';
import { Command, RunProps } from '@/lib/cli/Command';
import {
  StaticFiles,
  TxtFile,
  TxtFileContentByFileName,
  allFiles,
} from '@/lib/cli/files';
import { ReactNode } from 'react';

export class Cat extends Command {
  constructor() {
    super([
      [
        `cat [file]`,
        `Displays the contents of a file or shows a download link.`,
      ],
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
      throw new Error(`Unknown file: ${values[0]}`);
    }
    if (Object.values(TxtFile).includes(values[0] as TxtFile)) {
      return TxtFileContentByFileName[values[0] as TxtFile];
    }
    if (Object.values(StaticFiles).includes(values[0] as StaticFiles)) {
      return (
        <Link href={`/${values[0]}`} download>
          {values[0]}
        </Link>
      );
    }
  }
}
