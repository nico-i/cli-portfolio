import { Button } from '@/components/Button';

type MacroBarProps = {
  macros: Record<string, () => void>;
};

export const MacroBar = ({ macros }: Readonly<MacroBarProps>) => {
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
        flex
        justify-center
        lg:justify-start`}
    >
      {Object.entries(macros).map(([name, onClick]) => (
        <Button key={name} onClick={onClick}>
          {name}
        </Button>
      ))}
    </nav>
  );
};
