import { Link } from 'gatsby';
import { ReactNode } from 'react';

interface LinkButtonProps {
  href: string;
  children: ReactNode;
}

export default function LinkButton({
  href,
  children,
}: Readonly<LinkButtonProps>) {
  if (href.startsWith(`/`)) {
    return <Link to={href}>{children}</Link>;
  }

  if (href.split(`.`).length > 1) {
    // href is a file
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}&nbsp;
    </a>
  );
}
