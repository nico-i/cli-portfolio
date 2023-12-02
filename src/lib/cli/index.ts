import cat from '@/lib/cli/commands/cat';
import echo from '@/lib/cli/commands/echo';
import help from '@/lib/cli/commands/help';
import { ReactNode } from 'react';

export enum Cmd {
  none = ``,
  cat = `cat`,
  help = `help`,
  echo = `echo`,
}

export interface CmdProps {
  flags: Record<string, string>;
  args: string[];
}

export interface CliProps extends CmdProps {
  cmd: Cmd;
}

export default function cli({ cmd, flags, args }: CliProps): ReactNode {
  const cmdProps = { flags, args };

  switch (cmd) {
    case Cmd.none:
      return null;
    case Cmd.cat:
      return cat(cmdProps);
    case Cmd.help:
      return help(cmdProps);
    case Cmd.echo:
      return echo(cmdProps);
    default:
      throw new Error(`Unknown command: ${cmd}`);
  }
}
