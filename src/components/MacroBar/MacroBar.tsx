import { MacroProps } from '@/components/MacroBar/Macro/Macro';
import { ReactElement } from 'react';

type MacroBarProps = {
  children: ReactElement<MacroProps>[];
};

export const MacroBar = ({ children }: Readonly<MacroBarProps>) => {
  return (
    <nav
      className={`
        z-10
        px-5
        h-min
        w-full
        fixed
        lg:top-0
        bottom-0
        invert
        lg:gap-5
        gap-3
        flex
        justify-center
        lg:justify-start`}
    >
      {children}
    </nav>
  );
};
