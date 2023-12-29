import { Button } from '@/components/Button';
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
        window.dispatchEvent(StopStandaloneEvent);
        window.dispatchEvent(RunEvent(command));
      }}
    >
      {name}
    </Button>
  );
};
