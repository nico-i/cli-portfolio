import { ArgCountError, UnknownFlagsError } from '@/components/Cli/cmd/types';
import {
  CliCmd,
  RunProps,
  UsageTuple,
} from '@/components/Cli/cmd/types/CliCmd';
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

  public run({ flags, values }: RunProps): ReactNode {
    if (values.length > 0) {
      throw new ArgCountError(0, values.length);
    }

    if (Object.keys(flags).length > 0) {
      throw new UnknownFlagsError(Object.keys(flags)[0]);
    }

    window.dispatchEvent(ClearEvent);
    return null;
  }
}
