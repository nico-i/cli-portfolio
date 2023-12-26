import { CliCmd, RunProps } from '@/components/Cli/cmd/CliCmd';
import { allImageNames, allImagesByName } from '@/components/Cli/files/images';
import { CSSProperties, ReactNode } from 'react';

export class Viu extends CliCmd {
  get fileName(): string {
    return `viu`;
  }

  get usages() {
    return {
      usage: `${this.fileName} [file]`,
      description: `Displays an image in the terminal`,
    };
  }

  flags = [
    {
      usage: `-w [width]`,
      description: `Sets the width of the image`,
    },
    {
      usage: `-h [height]`,
      description: `Sets the height of the image`,
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
