import { allCommandNames, allCommandsByName } from '@/components/Cli/cmd';
import {
  ArgCountError,
  UnknownCommandError,
  UnknownFlagsError,
} from '@/components/Cli/cmd/types';
import {
  allScriptNames,
  allScriptsByName,
} from '@/components/Cli/files/scripts';
import { ReactNode } from 'react';

export const runPrompt = (
  args: string[],
): { result: ReactNode; isStandalone: boolean } => {
  const cmd: string = args[0];

  if (allScriptNames.includes(cmd)) {
    const script = allScriptsByName[cmd];
    return {
      result: script.run(),
      isStandalone: script.isStandalone,
    };
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

  if (!allCommandNames.includes(cmd)) {
    throw new UnknownCommandError(cmd);
  }

  const command = allCommandsByName[cmd];

  if (
    Object.keys(flags).length > 0 &&
    Object.keys(flags).some((flag) => {
      if (command.flags === undefined) return true;
      let flagArr;
      if (Array.isArray(command.flags)) {
        flagArr = command.flags;
      } else {
        flagArr = [command.flags];
      }
      return !flagArr.map((f) => f.usage).includes(flag);
    })
  ) {
    throw new UnknownFlagsError(Object.keys(flags)[0]);
  }

  if (
    values.length < command.expectedArgCountInterval[0] ||
    values.length > command.expectedArgCountInterval[1]
  ) {
    throw new ArgCountError(command.expectedArgCountInterval, values.length);
  }

  return {
    result: command.run({ flags, values }),
    isStandalone: command.isStandalone,
  };
};
