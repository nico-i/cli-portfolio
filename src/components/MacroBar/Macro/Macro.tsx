import { Button } from '@/components/Button';
import { Clear } from '@/components/Cli/cmd/clear';
import { RunEvent, StopStandaloneEvent } from '@/util/types';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface MacroProps {
  command: string;
  name: ReactNode;
  desktopOnly?: boolean;
}

export const Macro = ({
  name,
  command,
  desktopOnly = false,
}: Readonly<MacroProps>) => {
  return (
    <Button
      className={clsx(desktopOnly && `hidden lg:block`)}
      onClick={() => {
        const searchParams = new URLSearchParams(window.location.search);
        const cmd = searchParams.get(`cmd`);
        const decodedCmdParam = decodeURIComponent(cmd || ``);
        if (
          decodedCmdParam === command &&
          command.includes(new Clear().fileName)
        ) {
          return;
        }

        window.dispatchEvent(StopStandaloneEvent);
        window.dispatchEvent(RunEvent(command));
      }}
    >
      {name}
    </Button>
  );
};
