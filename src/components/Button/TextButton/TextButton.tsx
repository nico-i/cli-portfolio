import clsx from 'clsx';
import { ReactNode } from 'react';

export interface TextButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const TextButton = ({
  children,
  onClick,
  className,
}: Readonly<TextButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `underline
        decoration-2
        font-bold`,
        className,
      )}
    >
      {children}
    </button>
  );
};
