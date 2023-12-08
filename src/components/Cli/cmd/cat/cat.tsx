import { Command, RunProps } from '@/components/Cli/Command';
import {
  StaticFile,
  TextFile,
  TextFileContentByFileName,
  getAllFiles,
} from '@/components/Cli/files';
import { Link } from '@/components/Link';
import { ReactNode } from 'react';

export class Cat extends Command {
  constructor() {
    super([
      [
        `cat [file]`,
        `Displays the contents of a file or shows a download link`,
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
    if (!Object.values(getAllFiles()).includes(values[0])) {
      throw new Error(`Unknown file: ${values[0]}`);
    }
    if (Object.values(TextFile).includes(values[0] as TextFile)) {
      return TextFileContentByFileName[values[0] as TextFile];
    }
    if (Object.values(StaticFile).includes(values[0] as StaticFile)) {
      return (
        <Link href={`/${values[0]}`} download>
          {values[0]}
        </Link>
      );
    }
  }
}
