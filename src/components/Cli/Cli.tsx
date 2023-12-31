import { allCommandNames, allCommandsByName } from '@/components/Cli/cmd';
import {
  ArgCountError,
  NotExecutableError,
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
  let isScript = false;
  const strippedArgs = args.map((arg, i) => {
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
    if (i === 0 && args.length === 1) {
      isScript = true;
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
  } else if (isScript) {
    throw new NotExecutableError(cmd);
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

export function getSuggestions(args: string[]): string[] {
  let lastArg = args.at(-1) ?? ``;
  let lastArgPrefix = ``;

  if (lastArg === ``) return [];

  if (lastArg.startsWith(`./`) || lastArg.startsWith(`/`)) {
    const lastArgSplit = lastArg.split(`/`);
    if (lastArgSplit.length !== 2) return [];
    lastArgPrefix = lastArgSplit[0];
    lastArg = lastArgSplit[1];
  } else if (args.length === 1) {
    const cmdSuggestions = allCommandNames.filter((cmd) =>
      cmd.startsWith(lastArg),
    );
    if (cmdSuggestions.length > 0) return cmdSuggestions;
  }

  const fileSuggestions = allFileNames.filter((file) =>
    file.startsWith(lastArg),
  );

  if (fileSuggestions.length > 0 || lastArgPrefix !== ``) {
    return fileSuggestions.map((file) =>
      lastArgPrefix !== `` ? [lastArgPrefix, file].join(`/`) : file,
    );
  }

  return [];
}
