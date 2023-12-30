import { CliFile } from '@/components/Cli/files/CliFile';
import { Section } from '@/components/Cli/files/html/Section/Section';

const name = `intro`;

const IntroRun = () => <Section name={name} />;

export class Intro extends CliFile {
  get fileName(): string {
    return `${name}.html`;
  }

  public run() {
    return <IntroRun />;
  }
}
