import { allCommandsByName } from '@/components/Cli/cmd';
import { CliCmd, RunProps } from '@/components/Cli/cmd/CliCmd';
import { Fragment, ReactNode } from 'react';

export class Help extends CliCmd {
  get fileName(): string {
    return `help`;
  }

  get usages() {
    return [
      {
        usage: this.fileName,
        description: `Prints general help`,
      },
      {
        usage: `${this.fileName} [command]`,
        description: `Prints general help or help for a specific command`,
      },
    ];
  }

  public run({ flags, values }: RunProps): ReactNode {
    if (values.length > 1) {
      throw new Error(`Expected a maximum of 1 argument, got ${values.length}`);
    }

    if (Object.keys(flags).length > 0) {
      throw new Error(`Unknown flag(s): ${Object.keys(flags).join(`, `)}`);
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
