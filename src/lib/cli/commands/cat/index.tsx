import { CmdProps } from '@/lib/cli';
import { TxtFile, TxtFileContentByFileName } from '@/lib/files/txt';
import { ReactNode } from 'react';

export const help = `Usage: cat [file] - Prints the contents of a file to the terminal`;

export default function cat({ flags, args }: CmdProps): ReactNode {
  if (Object.keys(flags).length > 0) {
    throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
  }
  if (args.length !== 1) {
    throw new Error(`Expected 1 argument, got ${args.length}`);
  }
  if (!Object.values(TxtFile).includes(args[0] as TxtFile)) {
    throw new Error(`Unknown file: ${args[0]}`);
  }
  return TxtFileContentByFileName[args[0] as TxtFile];
}
