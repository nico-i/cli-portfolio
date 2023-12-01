import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  className?: string;
  children: ReactNode;
};

export default function Button({
  onClick,
  children,
  className,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={clsx(
        `px-2.5
        text-current
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
}
