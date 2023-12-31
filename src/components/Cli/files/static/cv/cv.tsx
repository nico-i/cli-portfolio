import { CliStaticFileResult } from '@/components/Cli/files/static/CliStaticFile';
import { CliFile } from '@/components/Cli/files/types/CliFile';

export class Cv extends CliFile {
  get fileName(): string {
    return `cv.pdf`;
  }

  public run() {
    return <CliStaticFileResult fileName={this.fileName} />;
  }
}
