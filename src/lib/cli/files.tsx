import Link from '@/components/Link';
import { StaticImage } from 'gatsby-plugin-image';
import { ReactNode } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';

export enum ImageFile {
  selfie = `selfie.jpg`,
}

export const imageByFileName: Record<ImageFile, ReactNode> = {
  [ImageFile.selfie]: (
    <StaticImage
      src={`../../assets/img/selfie.jpg`}
      alt={`Portrait`}
      objectFit="contain"
    />
  ),
};

export enum StaticFile {
  cv = `cv.pdf`,
}

export const StaticFilePathByFileName: Record<StaticFile, string> = {
  [StaticFile.cv]: `/cv.pdf`,
};

export enum TextFile {
  intro = `intro.html`,
  about = `about.html`,
  contact = `contact.html`,
}
const iconClasses = `
  inline
    mr-2
    w-5
    h-5
    `;

export const TextFileContentByFileName: Record<TextFile, ReactNode> = {
  [TextFile.intro]: `This is the intro text`,
  [TextFile.about]: (
    <div className="flex flex-col gap-2.5">
      <span>
        I’m Nico, a passionate Software Engineer, Designer, and Maker from the
        beautiful town of Wiesbaden, Germany.
      </span>
      <span>
        Currently, I&apos;m channeling my creativity and technical skills into
        frontend development at AOE, Wiesbaden’s{` `}
        <Link href="#">open web company</Link>.
      </span>
      <span>
        When I&apos;m not coding or designing, you&apos;ll often find me
        exploring the world of <Link href="#">photography</Link>, delving into
        the exciting realm of automation, or experimenting with 3D printing.
      </span>
      <span>
        These interests not only fuel my creativity but also constantly inspire
        me to integrate innovative ideas into my professional work.
      </span>
      <span>
        If you’d like some more insider details on myself, be sure to{` `}
        <Link href={`/${StaticFile.cv}`} download>
          download my CV
        </Link>
        !
      </span>
      <span>
        Looking forward to connecting and exploring potential collaborations!
        :-)
      </span>
    </div>
  ),
  [TextFile.contact]: (
    <div className="flex flex-col justify-start gap-1">
      <span>
        <IoIosMail className={iconClasses} />
        <Link href="mailto:nico@ismaili.de">nico@ismaili.de</Link>
      </span>

      <span>
        <FaLinkedin className={iconClasses} />
        <Link href="https://linkedin.com/in/ismailinico">ismailinico</Link>
      </span>

      <span>
        <FaGithub className={iconClasses} />
        <Link href="https://github.com/nico-i">nico-i</Link>
      </span>

      <span>
        <FaInstagram className={iconClasses} />
        <Link href="https://instagram.com/nico.ismaili">nico.ismaili</Link>
      </span>

      <span>
        <FaYoutube className={iconClasses} />
        <Link href="https://youtube.com/channel/nico-i">Nico I.</Link>
      </span>

      <span className="mt-2.5">© Nico Ismaili, 2023</span>
    </div>
  ),
};

export function getAllFiles(): string[] {
  return [
    ...Object.values(TextFile),
    ...Object.values(StaticFile),
    ...Object.values(ImageFile),
  ];
}
