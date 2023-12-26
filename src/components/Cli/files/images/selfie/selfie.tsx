import { CliFile } from '@/components/Cli/files/CliFile';
import { StaticImage } from 'gatsby-plugin-image';

export class Selfie extends CliFile {
  get fileName(): string {
    return `selfie.jpg`;
  }

  public run() {
    return (
      <StaticImage
        src={`../../../../../assets/img/selfie.jpg`}
        alt={`Portrait`}
        objectFit="contain"
      />
    );
  }
}
