import { Link as GatsbyLink } from 'gatsby';
import { ReactNode } from 'react';
import { FaArrowAltCircleDown, FaExternalLinkAlt } from 'react-icons/fa';

interface LinkButtonProps {
  href: string;
  isDownload?: boolean;
  children: ReactNode;
}

export default function Link({
  href,
  children,
  isDownload = false,
}: Readonly<LinkButtonProps>) {
  if (href.startsWith(`/`)) {
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

  const iconClasses = `
  ml-1
  fill-log-500
  group-hover:fill-log-400
  w-2.5`;

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
      {isDownload ? (
        <FaArrowAltCircleDown className={iconClasses} />
      ) : (
        <FaExternalLinkAlt className={iconClasses} />
      )}
    </a>
  );
}
