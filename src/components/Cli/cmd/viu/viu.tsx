import { CliCmd, RunProps, UsageTuple } from '@/components/Cli/cmd/CliCmd';
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

  public run({ values, flags }: RunProps): ReactNode {
    if (values.length === 0) {
      throw new Error(`No file specified`);
    }
    if (values.length > 1) {
      throw new Error(`Expected 1 input, got ${values.length}`);
    }
    if (!allImageNames.includes(values[0])) {
      throw new Error(`Unknown file ${values[0]}`);
    }

    let width: undefined | number;
    let height: undefined | number;

    if (Object.keys(flags).length > 0) {
      Object.entries(flags).forEach(([flag, value]) => {
        if (flag === `-w` || flag === `--width`) {
          width = Number(value);
          if (Number.isNaN(width))
            throw new Error(`Invalid width. Expected number got ${value}`);
        } else if (flag === `-h` || flag === `--height`) {
          height = Number(value);
          if (Number.isNaN(height))
            throw new Error(`Invalid height. Expected number got  ${value}`);
        } else {
          throw new Error(`Unknown flag ${flag}`);
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
