import { Command } from '@/lib/cli/Command';
import { Cat } from '@/lib/cli/commands/cat';
import { Clear } from '@/lib/cli/commands/clear';
import { Echo } from '@/lib/cli/commands/echo';
import { Help } from '@/lib/cli/commands/help';
import { ReactNode } from 'react';

export enum CommandName {
  cat = `cat`,
  help = `help`,
  echo = `echo`,
  clear = `clear`,
}

export const allCommandsByName: Record<CommandName, Command> = {
  [CommandName.clear]: new Clear(),
  [CommandName.cat]: new Cat(),
  [CommandName.help]: new Help(),
  [CommandName.echo]: new Echo(),
};

export function cli(args: string[]): ReactNode {
  const cmd = args[0] as CommandName;
  const flags: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith(`-`) || !/^--?/.test(arg)) {
      continue;
    }
    flags[arg] = ``;
    if (i + 1 >= args.length) {
      break;
    }
    flags[arg] = args[i + 1];
    i++;
  }
  const values = args.slice(1).filter((arg) => !arg.startsWith(`-`));

  if (Object.values(CommandName).includes(cmd) === false) {
    throw new Error(`Unknown command: ${cmd}`);
  }
  return allCommandsByName[cmd].run({
    flags,
    values,
  });
}
