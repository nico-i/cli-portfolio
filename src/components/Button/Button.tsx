import clsx from 'clsx';
import { ReactNode } from 'react';

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

export const Button = ({
  onClick,
  children,
  className,
}: Readonly<ButtonProps>) => {
  return (
    <button
      className={clsx(
        `text-current
        lg:px-2.5
        px-1.5
        relative
        after:content-['']
        after:absolute
        after:inset-0
        hover:after:backdrop-invert`,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
