import { Button } from '@/components/Button';
import { RunEvent } from '@/util/types';
import clsx from 'clsx';

export interface MacroProps {
  command: string;
  name: string;
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
        window.dispatchEvent(RunEvent(command));
      }}
    >
      {name}
    </Button>
  );
};
