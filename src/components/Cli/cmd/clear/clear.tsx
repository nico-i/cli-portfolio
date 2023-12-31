import { CliCmd, UsageTuple } from '@/components/Cli/cmd/types/CliCmd';
import { ClearEvent } from '@/util/types';
import { ReactNode } from 'react';

export class Clear extends CliCmd {
  get fileName(): string {
    return `clear`;
  }

  get usages(): UsageTuple {
    return {
      usage: this.fileName,
      i18nKey: `cmd.clear`,
    };
  }

  public run(): ReactNode {
    window.dispatchEvent(ClearEvent);
    return null;
  }
}
