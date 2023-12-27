import { CliFile } from '@/components/Cli/files/CliFile';
import { Section } from '@/components/Cli/files/html/useSection/Section';

const name = `intro`;

const IntroRun = () => <Section name={name} locale={`en`} />;

export class Intro extends CliFile {
  get fileName(): string {
    return `${name}.html`;
  }

  public run() {
    return <IntroRun />;
  }
}
