import { CommandName, allCommandsByName } from '@/components/Cli';
import { Command, RunProps } from '@/components/Cli/Command';
import { Fragment, ReactNode } from 'react';

export class Help extends Command {
  get usages() {
    return [
      {
        usage: `help`,
        description: `Prints general help`,
      },
      {
        usage: `help [command]`,
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
      return allCommandsByName[values[0] as CommandName]?.fullHelpToHTML();
    }

    return (
      <div className="w-full flex flex-col">
        {Object.values(allCommandsByName).map((command, i) => (
          <Fragment key={i}>{command.quickHelpToHTML()}</Fragment>
        ))}
      </div>
    );
  }
}
