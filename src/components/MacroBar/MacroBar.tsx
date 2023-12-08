import { Button } from '@/components/Button';

type MacroBarProps = {
  macros: Record<string, () => void>;
};

export const MacroBar = ({ macros }: Readonly<MacroBarProps>) => {
  return (
    <nav
      className={`
        shrink-0
        lg:shrink
        lg:order-first
        lg:z-10
        order-last
        px-5
        h-min
        w-full
        relative
        lg:sticky
        lg:top-0
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
