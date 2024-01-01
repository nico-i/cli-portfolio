import clsx from 'clsx';
import { ReactNode } from 'react';
import { FaExternalLinkAlt, FaFileDownload } from 'react-icons/fa';

interface LinkProps {
  href?: string;
  children?: ReactNode;
}

export const Link = ({ href, children }: Readonly<LinkProps>) => {
  const commonIconClasses = `
  ml-1
  w-2.5
  fill-log-500
  group-hover:fill-log-400`;

  if (!href) {
    return <span>{children}</span>;
  }

  const fileExtLength = href.split(`.`).pop()?.length;
  const isFile = fileExtLength && fileExtLength >= 3 && fileExtLength <= 4;

  return (
    <a
      href={href}
      target={`_blank`}
      rel={`noreferrer`}
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
      {isFile ? (
        <FaFileDownload className={clsx(commonIconClasses)} />
      ) : (
        <FaExternalLinkAlt className={clsx(commonIconClasses)} />
      )}
    </a>
  );
};
