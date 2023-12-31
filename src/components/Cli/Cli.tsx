import { allCommandNames, allCommandsByName } from '@/components/Cli/cmd';
import {
  ArgCountError,
  UnknownCommandError,
  UnknownFileError,
  UnknownFlagsError,
  UsageTuple,
} from '@/components/Cli/cmd/types';
import { allFileNames } from '@/components/Cli/files';
import {
  allScriptNames,
  allScriptsByName,
} from '@/components/Cli/files/scripts';
import { ReactNode } from 'react';

export const runPrompt = (
  args: string[],
): { result: ReactNode; isStandalone: boolean } => {
  const strippedArgs = args.map((arg) => {
    if (!arg.includes(`/`)) return arg;
    // is a file or path
    const strippedArg = arg.split(`/`).slice(1);
    if (strippedArg.length > 1) {
      throw new UnknownFileError(arg);
    }
    const fileName = strippedArg[0];
    if (!allFileNames.includes(fileName)) {
      throw new UnknownFileError(arg);
    }
    return fileName;
  });

  const cmd: string = strippedArgs[0];

  if (allScriptNames.includes(cmd)) {
    const script = allScriptsByName[cmd];
    // scripts do not support flags or vakues
    return {
      result: script.run(),
      isStandalone: script.isStandalone,
    };
  }

  const flagValuePair: Record<string, string> = {};
  for (let i = 0; i < strippedArgs.length; i++) {
    const arg = strippedArgs[i];
    if (!arg.startsWith(`-`) || !/^--?/.test(arg)) {
      continue;
    }
    flagValuePair[arg] = ``;
    if (i + 1 >= strippedArgs.length) {
      break;
    }
    flagValuePair[arg] = strippedArgs[i + 1];
    i++;
  }
  const values = strippedArgs
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
