import { CliFile } from '@/components/Cli/files/CliFile';
import { Link } from '@/components/Link';

export class About extends CliFile {
  get fileName(): string {
    return `about.html`;
  }

  public run() {
    return (
      <div className="flex flex-col gap-2.5">
        <span>
          I’m Nico, a passionate Software Engineer, Designer, and Maker from the
          beautiful town of Wiesbaden, Germany.
        </span>
        <span>
          Currently, I&apos;m channeling my creativity and technical skills into
          frontend development at AOE, Wiesbaden’s&nbsp;
          <Link href="#">open web company</Link>.
        </span>
        <span>
          When I&apos;m not coding or designing, you&apos;ll often find me
          exploring the world of <Link href="#">photography</Link>, delving into
          the exciting realm of automation, or experimenting with 3D printing.
        </span>
        <span>
          These interests not only fuel my creativity but also constantly
          inspire me to integrate innovative ideas into my professional work.
        </span>
        <span>
          If you’d like some more insider details on myself, be sure to&nbsp;
          <Link href={`/cv.pdf`} download>
            download my CV
          </Link>
          !
        </span>
        <span>
          Looking forward to connecting and exploring potential collaborations!
          :-)
        </span>
      </div>
    );
  }
}
