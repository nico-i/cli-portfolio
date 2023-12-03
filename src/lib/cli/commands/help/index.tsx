import { Command, RunProps } from '@/lib/cli/Command';
import { Fragment, ReactNode } from 'react';
import { CommandName, allCommandsByName } from '../../cli';

export class Help extends Command {
  constructor() {
    super([
      [`help`, `Prints general help`],
      [`help [command]`, `Prints help for a specific command`],
    ]);
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
