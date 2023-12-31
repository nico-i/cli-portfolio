import { allCommandsByName } from '@/components/Cli/cmd';
import { UnknownFlagsError } from '@/components/Cli/cmd/types';
import {
  CliCmd,
  RunProps,
  UsageTuple,
} from '@/components/Cli/cmd/types/CliCmd';
import { Fragment, ReactNode } from 'react';

export class Help extends CliCmd {
  get fileName(): string {
    return `help`;
  }

  get usages(): UsageTuple[] {
    return [
      {
        usage: this.fileName,
        i18nKey: `cmd.help`,
      },
      {
        usage: `${this.fileName} [command]`,
        i18nKey: `cmd.help-command`,
      },
    ];
  }

  expectedArgCountInterval = [0, 1] as [number, number];

  public run({ flags, values }: RunProps): ReactNode {
    if (Object.keys(flags).length > 0) {
      throw new UnknownFlagsError(Object.keys(flags)[0]);
    }

    if (values.length === 1) {
      return allCommandsByName[values[0]]?.fullHelpToHTML();
    }

    return (
      <div className="w-full flex flex-col">
        {Object.values(allCommandsByName).map((command) => (
          <Fragment key={command.fileName}>
            {command.quickHelpToHTML()}
          </Fragment>
        ))}
      </div>
    );
  }
}
