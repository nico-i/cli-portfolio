import { CmdProps } from '@/lib/cli';
import { ReactNode } from 'react';

export function echo({ flags, args }: CmdProps): ReactNode {
  if (Object.keys(flags).length > 0) {
    throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
  }

  if (args.length === 0) {
    return ``;
  }

  if (
    (args.length === 1 &&
      (!args[0].startsWith(`"`) || !args[0].endsWith(`"`))) ||
    (args.length >= 2 &&
      (!args[0].startsWith(`"`) || !args[args.length - 1].endsWith(`"`)))
  ) {
    throw new Error(`Expected string, got ${args.length}`);
  }

  return args.join(` `).replace(/"/g, ``);
}
