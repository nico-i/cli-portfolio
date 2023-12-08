import { Command, RunProps } from '@/components/Cli/Command';
import { ImageFile, imageByFileName } from '@/components/Cli/files';
import { CSSProperties, ReactNode } from 'react';

export class Viu extends Command {
  constructor() {
    super(
      [[`viu [file]`, `Displays an image in the terminal`]],
      [
        [[`-w [width]`, `--width [width]`], `Sets the width of the image`],
        [[`-h [height]`, `--height [height]`], `Sets the height of the image`],
      ],
    );
  }

  public run({ values, flags }: RunProps): ReactNode {
    if (values.length === 0) {
      throw new Error(`No file specified`);
    }
    if (values.length > 1) {
      throw new Error(`Expected 1 input, got ${values.length}`);
    }
    if (!Object.values(ImageFile).includes(values[0] as ImageFile)) {
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

    return <div style={style}>{imageByFileName[values[0] as ImageFile]}</div>;
  }
}
