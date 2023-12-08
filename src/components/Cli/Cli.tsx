import { Command } from '@/components/Cli/Command';
import { Cat, Clear, Echo, Help, Ls, Viu } from '@/components/Cli/cmd';
import { Projects } from '@/components/Cli/scripts/projects';
import { Skills } from '@/components/Cli/scripts/skills';
import { ReactNode } from 'react';

export enum CommandName {
  cat = `cat`,
  help = `help`,
  echo = `echo`,
  clear = `clear`,
  ls = `ls`,
  viu = `viu`,
}

export enum ScriptName {
  skills = `skills.sh`,
  projects = `projects.sh`,
}

export const allScriptsByName: Record<ScriptName, ReactNode> = {
  [ScriptName.skills]: <Skills />,
  [ScriptName.projects]: <Projects />,
};

export const allCommandsByName: Record<CommandName, Command> = {
  [CommandName.clear]: new Clear(),
  [CommandName.cat]: new Cat(),
  [CommandName.help]: new Help(),
  [CommandName.echo]: new Echo(),
  [CommandName.ls]: new Ls(),
  [CommandName.viu]: new Viu(),
};

export const runPrompt = (args: string[]) => {
  const cmd: string = args[0];

  if (Object.values(ScriptName).includes(cmd as ScriptName)) {
    return allScriptsByName[cmd as ScriptName];
  }

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

  if (Object.values(CommandName).includes(cmd as CommandName) === false) {
    throw new Error(`Unknown command: ${cmd}`);
  }
  return allCommandsByName[cmd as CommandName].run({
    flags,
    values,
  });
};
