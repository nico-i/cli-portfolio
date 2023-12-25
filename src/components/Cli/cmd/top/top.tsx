import { Command } from '@/components/Cli/Command';
import { ReactNode } from 'react';

export class Top extends Command {
  get usages() {
    return {
      usage: `top`,
      description: `Scrolls to the top of the terminal window`,
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
