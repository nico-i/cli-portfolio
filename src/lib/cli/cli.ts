import { Command } from '@/lib/cli/Command';
import { Cat } from '@/lib/cli/commands/cat';
import { Clear } from '@/lib/cli/commands/clear';
import { Echo } from '@/lib/cli/commands/echo';
import { Help } from '@/lib/cli/commands/help';
import { Ls } from '@/lib/cli/commands/ls';
import { Viu } from '@/lib/cli/commands/viu';
import { ReactNode } from 'react';

export enum CommandName {
  cat = `cat`,
  help = `help`,
  echo = `echo`,
  clear = `clear`,
  ls = `ls`,
  viu = `viu`,
}

export const allCommandsByName: Record<CommandName, Command> = {
  [CommandName.clear]: new Clear(),
  [CommandName.cat]: new Cat(),
  [CommandName.help]: new Help(),
  [CommandName.echo]: new Echo(),
  [CommandName.ls]: new Ls(),
  [CommandName.viu]: new Viu(),
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
  const values = args
    .slice(1)
    .filter(
      (arg) =>
        !Object.values(flags).includes(arg) &&
        !Object.keys(flags).includes(arg),
    );

  if (Object.values(CommandName).includes(cmd) === false) {
    throw new Error(`Unknown command: ${cmd}`);
  }
  return allCommandsByName[cmd].run({
    flags,
    values,
  });
}
