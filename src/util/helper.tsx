import cli, { Cmd } from '@/lib/cli';
import { PromptHistoryEntry } from '@/util/types';

export const updateQueryString = (newSearchParams?: URLSearchParams) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.search = newSearchParams?.toString() || ``;
  window.history.replaceState({}, ``, currentUrl);
};

export default function processPrompt(userPrompt: string): PromptHistoryEntry {
  const res: PromptHistoryEntry = [userPrompt, null];
  const consecutivePrompts = userPrompt.split(`&&`);
  // recursively process commands
  if (consecutivePrompts.length > 1) {
    for (const cmd of consecutivePrompts) {
      const consecutiveCmdRes = processPrompt(cmd);
      res[1] = (
        <>
          {res[1]}
          <br />
          {consecutiveCmdRes[1]}
        </>
      );
    }
    return res;
  }
  try {
    const cmd = userPrompt.split(` `)[0] as Cmd;
    const args = userPrompt.split(` `).slice(1);
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

    res[1] = cli({ cmd, args, flags });
  } catch (e) {
    res[1] = (e as Error).message;
  }
  res.push([userPrompt, res] as PromptHistoryEntry);
  return res;
}
