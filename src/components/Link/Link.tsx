import clsx from 'clsx';
import { ReactNode } from 'react';
import { FaExternalLinkAlt, FaFileDownload } from 'react-icons/fa';

interface LinkButtonProps {
  href: string;
  download?: boolean;
  children: ReactNode;
}

export const Link = ({
  href,
  children,
  download = false,
}: Readonly<LinkButtonProps>) => {
  const commonIconClasses = `
  ml-1
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
      <span
        className={`
        text-log-500
        group-hover:text-log-400
        underline`}
      >
        {children}
      </span>
      {download ? (
        <FaFileDownload className={clsx(commonIconClasses)} />
      ) : (
        <FaExternalLinkAlt className={clsx(commonIconClasses)} />
      )}
    </a>
  );
};
