import { UnknownFlagsError, ValueError } from '@/components/Cli/cmd/types';
import {
  CliCmd,
  RunProps,
  UsageTuple,
} from '@/components/Cli/cmd/types/CliCmd';
import { allImageNames, allImagesByName } from '@/components/Cli/files/images';
import { CSSProperties, ReactNode } from 'react';

export class Viu extends CliCmd {
  get fileName(): string {
    return `viu`;
  }

  get usages(): UsageTuple {
    return {
      usage: `${this.fileName} [file]`,
      i18nKey: `cmd.viu`,
    };
  }

  flags: UsageTuple[] = [
    {
      usage: `-w [width]`,
      i18nKey: `cmd.viu-flags-width`,
    },
    {
      usage: `-h [height]`,
      i18nKey: `cmd.viu-flags-height`,
    },
  ];

  expectedArgCountInterval = [1, 1] as [number, number];

  public run({ values, flags }: RunProps): ReactNode {
    if (!allImageNames.includes(values[0])) {
      throw new ValueError(`.jpg`, values[0]);
    }

    let width: undefined | number;
    let height: undefined | number;

    if (Object.keys(flags).length > 0) {
      Object.entries(flags).forEach(([flag, value]) => {
        if (flag === `-w` || flag === `--width`) {
          width = Number(value);
          if (Number.isNaN(width))
            throw new ValueError(`width as number`, value);
        } else if (flag === `-h` || flag === `--height`) {
          height = Number(value);
          if (Number.isNaN(height))
            throw new ValueError(`height as number`, value);
        } else {
          throw new UnknownFlagsError(flag);
        }
      });
    }

    const style: CSSProperties = {};
    if (width) {
      style.width = width;
    }
    if (height) {
      style.height = height;
    }

    return <div style={style}>{allImagesByName[values[0]].run()}</div>;
  }
}
