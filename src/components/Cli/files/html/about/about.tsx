import { CliFile } from '@/components/Cli/files/CliFile';
import { Section } from '@/components/Cli/files/html/Section/Section';

const name = `about`;

const AboutRun = () => <Section name={name} locale={`en`} />;

export class About extends CliFile {
  get fileName(): string {
    return `${name}.html`;
  }

  public run() {
    return <AboutRun />;
  }
}
