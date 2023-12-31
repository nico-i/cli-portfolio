import { Section } from '@/components/Cli/files/html/Section/Section';
import { CliFile } from '@/components/Cli/files/types/CliFile';

const name = `about`;

const AboutRun = () => <Section name={name} />;

export class About extends CliFile {
  get fileName(): string {
    return `${name}.html`;
  }

  public run() {
    return <AboutRun />;
  }
}
