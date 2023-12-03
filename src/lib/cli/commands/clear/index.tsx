import { Command, RunProps } from '@/lib/cli/Command';
import { navigate } from 'gatsby';
import { ReactNode } from 'react';

export class Clear extends Command {
  constructor() {
    super([[`clear`, `Clears the terminal screen and command history`]]);
  }

  public run({ flags, values }: RunProps): ReactNode {
    if (values.length > 0) {
      throw new Error(`Expected 0 arguments, got ${values.length}`);
    }

    if (Object.keys(flags).length > 0) {
      throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
    }

    navigate(`/?clear=true`, { replace: true });
    return null;
  }
}
