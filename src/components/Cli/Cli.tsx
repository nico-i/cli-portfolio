import { allCommandNames, allCommandsByName } from '@/components/Cli/cmd';
import {
  ArgCountError,
  UnknownCommandError,
  UnknownFlagsError,
  UsageTuple,
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

  const flagValuePair: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith(`-`) || !/^--?/.test(arg)) {
      continue;
    }
    flagValuePair[arg] = ``;
    if (i + 1 >= args.length) {
      break;
    }
    flagValuePair[arg] = args[i + 1];
    i++;
  }
  const values = args
    .slice(1)
    .filter(
      (arg) =>
        !Object.values(flagValuePair).includes(arg) &&
        !Object.keys(flagValuePair).includes(arg),
    );

  if (!allCommandNames.includes(cmd)) {
    throw new UnknownCommandError(cmd);
  }

  const command = allCommandsByName[cmd];
  let commandFlags: UsageTuple[] | undefined;
  if (command.flags) {
    if (Array.isArray(command.flags)) {
      commandFlags = command.flags;
    } else {
      commandFlags = [command.flags];
    }
  }

  if (
    Object.keys(flagValuePair).length > 0 &&
    !commandFlags?.some((flag) =>
      Object.keys(flag.usage.includes(flagValuePair[0])),
    )
  ) {
    throw new UnknownFlagsError(Object.keys(flagValuePair)[0]);
  }

  if (
    values.length < command.expectedArgCountInterval[0] ||
    values.length > command.expectedArgCountInterval[1]
  ) {
    throw new ArgCountError(command.expectedArgCountInterval, values.length);
  }

  return {
    result: command.run({ flags: flagValuePair, values }),
    isStandalone: command.isStandalone,
  };
};
