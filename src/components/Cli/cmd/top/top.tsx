import { CliCmd, UsageTuple } from '@/components/Cli/cmd/types/CliCmd';
import { ReactNode } from 'react';

export class Top extends CliCmd {
  get fileName(): string {
    return `top`;
  }

  get usages(): UsageTuple {
    return {
      usage: this.fileName,
      i18nKey: `cmd.top`,
    };
  }

  public run(): ReactNode {
    if (typeof window !== `undefined`) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10); // delay is necessary since shell auto-scrolls to bottom by default after a command is run
    }
    return null;
  }
}
