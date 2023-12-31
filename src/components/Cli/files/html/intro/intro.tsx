import { Section } from '@/components/Cli/files/html/Section/Section';
import { CliFile } from '@/components/Cli/files/types/CliFile';

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
