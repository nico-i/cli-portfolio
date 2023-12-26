import { CliCmd } from '@/components/Cli/cmd/CliCmd';
import { Cat } from '@/components/Cli/cmd/cat';
import { Clear } from '@/components/Cli/cmd/clear';
import { Echo } from '@/components/Cli/cmd/echo';
import { Help } from '@/components/Cli/cmd/help';
import { Ls } from '@/components/Cli/cmd/ls';
import { Top } from '@/components/Cli/cmd/top';
import { Viu } from '@/components/Cli/cmd/viu';

const allCommands: CliCmd[] = [Cat, Clear, Echo, Help, Ls, Top, Viu].map(
  (Cmd) => new Cmd(),
);
const allCommandNames: string[] = allCommands.map(
  (cmd: CliCmd) => cmd.fileName,
);
const allCommandsByName: Record<string, CliCmd> = allCommands.reduce(
  (acc, cmd) => {
    acc[cmd.fileName] = cmd;
    return acc;
  },
  {} as Record<string, CliCmd>,
);

export { allCommandNames, allCommandsByName };
