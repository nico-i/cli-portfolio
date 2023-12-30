import { CliFile } from '@/components/Cli/files/CliFile';
import { Fragment, ReactNode } from 'react';
export interface RunProps {
  flags: Record<string, string>;
  values: string[];
}

export interface UsageTuple {
  usage: string;
  description: string;
}

export abstract class CliCmd extends CliFile<RunProps> {
  abstract get usages(): UsageTuple[] | UsageTuple;
  flags?: UsageTuple[] | UsageTuple;

  public quickHelpToHTML = (): ReactNode => {
    let allUsages: UsageTuple[];
    if (!Array.isArray(this.usages)) {
      allUsages = [this.usages];
    } else {
      allUsages = this.usages;
    }
    return (
      <>
        {allUsages.map(({ usage, description }) => (
          <div
            key={usage}
            className="flex w-full justify-between md:justify-start"
          >
            <span className="md:w-52 w-auto">
              {usage.split(` `).map((word: string, i) => (
                <Fragment key={word}>
                  {i > 0 && <>&nbsp;</>}
                  {word}
                </Fragment>
              ))}
            </span>
            <span className="w-7/12">{description}</span>
          </div>
        ))}
      </>
    );
  };

  public fullHelpToHTML = (): ReactNode => {
    if (!this.flags || (Array.isArray(this.flags) && this.flags.length === 0)) {
      return this.quickHelpToHTML();
    }
    let allFlags: UsageTuple[];
    if (!Array.isArray(this.flags)) {
      allFlags = [this.flags];
    } else {
      allFlags = this.flags;
    }
    return (
      <div className="flex flex-col w-full">
        {this.quickHelpToHTML()}

        <h3 className="mt-4">Flags</h3>
        {allFlags.map(({ usage, description }) => (
          <div
            key={usage}
            className="flex w-full justify-between md:justify-start"
          >
            <span className="md:w-52 w-auto">
              {usage.split(` `).map((word: string, i) => (
                <Fragment key={word}>
                  {i > 0 && <>&nbsp;</>}
                  {word}
                </Fragment>
              ))}
            </span>
            <span className="w-7/12">{description}</span>
          </div>
        ))}
      </div>
    );
  };
}
