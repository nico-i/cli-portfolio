import { CliFile } from '@/components/Cli/files/CliFile';

export class Intro extends CliFile {
  get fileName(): string {
    return `intro.html`;
  }

  public run() {
    return (
      <div>
        <h1>Intro</h1>
      </div>
    );
  }
}
