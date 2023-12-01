import Button from '../Button';

type MacroBarProps = {
  macros: Record<string, () => void>;
};

export default function MacroBar({ macros }: Readonly<MacroBarProps>) {
  return (
    <nav
      className={`
        xl:top-0
        px-5
        h-min
        w-full
        invert
        flex
        fixed
        xl:sticky
        bottom-0
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
