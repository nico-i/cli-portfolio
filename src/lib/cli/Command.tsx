import { Fragment, ReactNode } from 'react';
export interface RunProps {
  flags: Record<string, string>;
  values: string[];
}

export abstract class Command {
  private usageDescriptionTuples: [string, string][];
  private flagsDescriptionTuples: [string[], string][] | undefined;

  constructor(
    usageDescriptionTuples: [string, string][],
    flags?: [string[], string][],
  ) {
    this.usageDescriptionTuples = usageDescriptionTuples;
    this.flagsDescriptionTuples = flags;
  }

  public abstract run(props: RunProps): ReactNode;

  public quickHelpToHTML = (): ReactNode => (
    <>
      {this.usageDescriptionTuples.map(([usage, description]) => (
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

  public fullHelpToHTML = (): ReactNode => (
    <div className="flex flex-col w-full">
      {this.quickHelpToHTML()}
      {this.flagsDescriptionTuples && this.flagsDescriptionTuples.length > 0}
    </div>
  );
}
