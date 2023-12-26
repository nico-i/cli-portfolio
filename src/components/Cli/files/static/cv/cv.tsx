import { CliFile } from '@/components/Cli/files/CliFile';
import { CliStaticFileResult } from '@/components/Cli/files/static/CliStaticFile';

export class Cv extends CliFile {
  get fileName(): string {
    return `cv.pdf`;
  }

  public run() {
    return <CliStaticFileResult fileName={this.fileName} />;
  }
}
