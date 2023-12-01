import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export default function Button({ onClick, children }: Readonly<ButtonProps>) {
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
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
