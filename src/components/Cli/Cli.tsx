import { allCommandNames, allCommandsByName } from '@/components/Cli/cmd';
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
    throw new Error(`Unknown command: ${cmd}`);
  }

  const command = allCommandsByName[cmd];
  return {
    result: command.run({ flags, values }),
    isStandalone: command.isStandalone,
  };
};
