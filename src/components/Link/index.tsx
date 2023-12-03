import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import { ReactNode } from 'react';
import { FaExternalLinkAlt, FaFileDownload } from 'react-icons/fa';
interface LinkButtonProps {
  href: string;
  download?: boolean;
  children: ReactNode;
}

export default function Link({
  href,
  children,
  download = false,
}: Readonly<LinkButtonProps>) {
  if (href.startsWith(`/`) && !download) {
    return (
      <span
        className={`
        text-neutral-0
        font-bold
        underline`}
      >
        <GatsbyLink to={href}>{children}</GatsbyLink>;
      </span>
    );
  }

  const commonIconClasses = `
  mx-1
  w-2.5
  fill-log-500
  group-hover:fill-log-400`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex
        group
        items-center
        `}
    >
      {download && <FaFileDownload className={clsx(commonIconClasses)} />}
      <span
        className={`
        text-log-500
        group-hover:text-log-400
        underline`}
      >
        {children}
      </span>
      {!download && <FaExternalLinkAlt className={clsx(commonIconClasses)} />}
    </a>
  );
}
