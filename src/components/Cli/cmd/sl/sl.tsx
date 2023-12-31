import { ValueError } from '@/components/Cli/cmd/types';
import {
  CliCmd,
  RunProps,
  UsageTuple,
} from '@/components/Cli/cmd/types/CliCmd';
import { ReactNode, useEffect } from 'react';

const SlRun = ({ targetLng }: Readonly<{ targetLng: string }>) => {
  useEffect(() => {
    // Using links improved seo
    document.getElementById(`i18n-${targetLng}`)?.click();
    setTimeout(() => {
      document.getElementById(`prompt`)?.focus();
    }, 10);
  }, [targetLng]);

  return null;
};

export class Sl extends CliCmd {
  get fileName(): string {
    return `sl`;
  }

  get usages(): UsageTuple {
    return {
      usage: `${this.fileName} [locale]`,
      i18nKey: `cmd.sl`,
    };
  }

  expectedArgCountInterval = [1, 1] as [number, number];

  public run({ values }: RunProps): ReactNode {
    if (![`en`, `de`].includes(values[0])) {
      // TODO: extract locales to a constant
      throw new ValueError(`locale`, values[0]);
    }
    return <SlRun targetLng={values[0]} />;
  }
}
