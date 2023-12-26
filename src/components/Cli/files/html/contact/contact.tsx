import { CliFile } from '@/components/Cli/files/CliFile';
import { Link } from '@/components/Link';
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
export class Contact extends CliFile {
  get fileName(): string {
    return `contact.html`;
  }

  public run() {
    const iconClasses = `
  inline
    mr-2
    w-5
    h-5
    `;
    return (
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
    );
  }
}
