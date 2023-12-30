import { CliFile } from '@/components/Cli/files/CliFile';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Fragment, ReactNode } from 'react';
export interface RunProps {
  flags: Record<string, string>;
  values: string[];
}

export interface UsageTuple {
  usage: string;
  i18nKey: string;
}

const QuickHelp = ({ usages }: { usages: UsageTuple[] | UsageTuple }) => {
  const { t } = useTranslation();

  let allUsages: UsageTuple[];
  if (!Array.isArray(usages)) {
    allUsages = [usages];
  } else {
    allUsages = usages;
  }
  return (
    <>
      {allUsages.map(({ usage, i18nKey }) => (
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
          <span className="w-7/12">{t(i18nKey)}</span>
        </div>
      ))}
    </>
  );
};

const FullHelp = ({
  usages,
  flags,
}: {
  usages: UsageTuple[] | UsageTuple;
  flags: UsageTuple[] | UsageTuple | undefined;
}) => {
  const { t } = useTranslation();

  if (!flags || (Array.isArray(flags) && flags.length === 0)) {
    return <QuickHelp usages={usages} />;
  }
  let allFlags: UsageTuple[];
  if (!Array.isArray(flags)) {
    allFlags = [flags];
  } else {
    allFlags = flags;
  }
  return (
    <div className="flex flex-col w-full">
      <QuickHelp usages={usages} />

      <h3 className="mt-4">Flags</h3>
      {allFlags.map(({ usage, i18nKey }) => (
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
          <span className="w-7/12">{t(i18nKey)}</span>
        </div>
      ))}
    </div>
  );
};

export abstract class CliCmd extends CliFile<RunProps> {
  abstract get usages(): UsageTuple[] | UsageTuple;
  flags?: UsageTuple[] | UsageTuple;

  public quickHelpToHTML = (): ReactNode => <QuickHelp usages={this.usages} />;

  public fullHelpToHTML = (): ReactNode => (
    <FullHelp usages={this.usages} flags={this.flags} />
  );
}
