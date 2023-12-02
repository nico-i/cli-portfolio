import { CmdProps } from '@/lib/cli';
import { navigate } from 'gatsby';
import { ReactNode } from 'react';

export function clear({ flags, args }: CmdProps): ReactNode {
  if (args.length > 0) {
    throw new Error(`Expected 0 arguments, got ${args.length}`);
  }

  if (Object.keys(flags).length > 0) {
    throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
  }

  navigate(`/?clear=true`, { replace: true });
  return null;
}
