import Button from '../Button';

type MacroBarProps = {
  macros: Record<string, () => void>;
};

export default function MacroBar({ macros }: Readonly<MacroBarProps>) {
  return (
    <nav
      className={`
       shrink-0
        xl:order-first
        px-5
        h-min
        w-full
        invert
        flex
        justify-center
        xl:justify-start`}
    >
      {Object.entries(macros).map(([name, onClick]) => (
        <Button key={name} onClick={onClick}>
          {name}
        </Button>
      ))}
    </nav>
  );
}
